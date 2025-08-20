const Course = require("../models/Course");
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