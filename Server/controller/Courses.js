const Courses = require("../models/Course");
const User = require("../models/user");
const Category = require("../models/Category");

// data uploaded to cloudinary
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { isInstructor } = require("../middelwares/auth");
const SubSection = require("../models/SubSection");

// now create course create handeler function

exports.createCourse = async (req, res) => {
  try {
    // import data
    let { courseName, courseDescription, whatYouWillLearn, price, tag,category ,status,instructions} =
      req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail||
      !category
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
     
    if (!status || status === undefined) {
			status = "Draft";
		}

    // check for instructor
    const userId = req.User.id;
    const instructorDetails = await User.findById(userId,{
      accountType: "Instructor",
    });

    console.log("instructorDetails :", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found",
      });
    }

    // check category is vallid or not

    const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
      // upload image to cloudinary
    

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create an entry of course

    const newCourse = await Courses.create({
      courseName,
      courseDescription,
      whatYouWillLearn: whatYouWillLearn,
      price,
      instructor: instructorDetails._id, // id is stored in schema
      tag: tag,
      category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
    });

    // add this new course in the schema of user instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id }, //find instructor with the help of this id
      {
        $push: {
          Courses: newCourse._id, // push new course in the courses of instructor
        },
      },
      { new: true }
    );

    // update Category schema
    await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
    // return res
    return res.status(200).json({
      success: true,
      message: "course Created sucessfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "course Creation failed",
      error: error.message,
    });
  }
};

// handerlser function to get all the courses

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Courses.find(
      {},
      {
        // these thing atleast present
        courseName: true,
        price: true,
        thumbnail: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All course fetched sucessfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "course fetching failed",
    });
  }
};


// get course details 
 exports.getCoursesDetails = async(req,res)=>{
  try{
      // get id
      const {courseId}=req.body;

      const courseDetails=await Courses.find({_id:courseId},
        
      )// we need  not in object  id form sol populate
      .populate({
        path:"instructor",
        populate:{
          path:"additionalDetails", // things are nested in this
        }
      }
      )
      .populate("category")
      .populate({path:"ratingAndReviews",
        populate :{path:"user",select:"firstName lastName accountType image"}
      })
      .populate({
        path:"courseContent",
        populate:{
          path:"section",
          Populate:{
            path:"SubSection"
          }
        }
      })
      .exc();

      // validation 
       if(!courseDetails){
        return res.status(500).json({
          success:false,
          message:`could not find the course with ${courseId}`,
        });

       }

       // return response 
       return res.status(200).json({
        success:true,
        message:"course details fetched successfully",
        data:courseDetails,
       })

        
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"failed in finding  course details ",
    });
  }
 }