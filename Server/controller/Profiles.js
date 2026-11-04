const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Profile = require("../models/Profile");
const User = require("../models/user");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.UpdateProfile = async (req, res) => {
  try {
    // fetch
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    //in auth we create a pyload in which we make a user id  and from middelware we go req.user then we can find id of user
    const id = req.User.id;
    // we can also validate all detail but here i am doing only one
    if (!id) {
      return res.status(400).json({
        success: true,
        message: "id missing",
      });
    }

    // we have user id show we find user details and from that we profile id because in user profile is mentioned as additionalDetails
    const userDetails = await User.findById(id);

    const profileId = userDetails.additionalDetails;

    // now we can find profile details with the help of profile id
    const profileDetails = await Profile.findById(profileId);
    // update profile
    // this is way of updating in a db whaere object is already made and previous places we make an object and then push
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    //   const updateDetails=await User.findByIdAndUpdate({userId},
    //     {
    //         $push:{
    //             additionalDetails : profileId,
    //         }
    //     },{new:true},
    // )

    // return response
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "profile updation failed",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  
  try {
    // find id of user
  
    const userId = req.User.id;
    // find user details
    
    const userDetails = await User.findById({_id:userId});
    // validate id
    if (!userId) {
      return res.status(400).json({
        success: true,
        message: " user not found",
      });
    }
    //console.log(userDetails)

    const profileId = userDetails.additionalDetails;
    

    // TODO HW  unroll the user from the enrolled courses


    // await Course.updateMany(
    //   { studentEnrolled: userId }, // Find all courses where the user is enrolled
    //   {
    //     $pull: { studentEnrolled: userId }, // Remove user from enrolled students array
    //   }
    // );

    //  TODO how we sedule deleltion of data after some days of deltion of user  .. see ppt abot corn job

    // first delete users profile
    await Profile.findByIdAndDelete({_id:profileId});

    // now delete user account
    await User.findByIdAndDelete({_id:userId});
    // or we can do this await User.findByIdAndDelete({_id:userId});

    // return response
    return res.status(200).json({
      success: true,
      message: "profile deleted successfully",
    });
  } catch (error) {
    
    console.error("Error deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "profile deletion failed",
    });
  }
};

exports.getAllUserDetails = async (req, res) => { 
  try {
    const userId = req.User.id;

    const userDetails = await User.findById({ _id: userId })
      .populate("additionalDetails")
      .exec(); // we populate additionalDetails becaouse it contains data as id but we need data in json or value :pair
     console.log(userDetails);
    return res.status(200).json({
      success: true,
      message: "user details fetched successfully",
      userDetails
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    return res.status(500).json({
      success: false,
      message: "user details fetching  failed",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  console.log("req.files:", req.files);
	try {

		const id = req.User.id;
    console.log("User ID:", id);
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
  if (!req.files || !req.files.pfp) {
    return res.status(400).json({
        success: false,
        message: "No file uploaded",
    });
}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}

exports.getEnrolledCourses= async (req, res)=>{
  try{
     const userId = req.user?.id || req.user?._id || req.User?.id || req.User?._id;
      // console.log("userId:", userId);
      let userDetails = await User.findOne({
      _id: userId,
       }) .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      }).exec()
      
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
         for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }
     if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  }
  catch(error){
return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user?.id || req.User?.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

