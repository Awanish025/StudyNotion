const RatingAndReview=require("../models/RatingAndReviews");
const Course=require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating 

exports.createRating=async(req,res)=>{
    try{
         // get user id
         const userId=req.user.id;

         // get details
         const {rating ,review,courseId}=req.body;

         // validate user if it is enrolled into the course 
         const courseDeatils=await Course.findById({_id:courseId,
                               studentEnrolled :{$eleMatch:{$er:userId}}            }

         );
 
         if(!courseDeatils){
                return res.status(400).json({
                    success:false,
                    message:"student is not enrolled in this course",
                })
             }


         // another way to validate user it is done by me
        //  const courseDeatils=await Course.findById(courseId);

        //  if(!courseDeatils.studentEnrolled.includes(userId)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"student is not enrolled in this course",
        //     })
        //  }

         // check if user has already reviewed this course
         const ratingDetails=await RatingAndReview.findOne({user:userId, course:courseId});
              if(ratingDetails){
                return res.status(403).json({
                    success:false,
                    message:"student already rate and review  this course",
                });
              }
               // create rating
                const createRating=await RatingAndReview.create(
                {   user:userId,
                    course:courseId,
                    rating:rating,
                     review:review,
                });

                // update courses with this rating and review
                  const updatedCourseDetails=     await Course.findByIdAndUpdate(courseId,
                    {
                        $push:{
                            RatingAndReview:createRating._id,//  createRating._id is pushed instead of the entire object.
                        }
                    },
                    {new:true},

                )
                console.log(updatedCourseDetails);
        

                // return response

                return res.status(200).json({
                    success:true,
                    message:"course rated and reviewed successfully",
                    data:createRating,
                })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({ 
            success:false,
            message:"rating and reviewing of course  failed"
        })
    }
}


// get aveage rating

exports.getAverageRating=async (req,res)=>{
    try{
         const courseId=req.body.courseId;
        // in this we use aggregation to find avg first find couses with particular course id
        // then group them and applay logic
        const result =await RatingAndReview.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId),
                }

            },
                {
                    $group:{
                        _id:null,// means they are all grouped together without any basis
                         averageRating:{$avg:"$rating"},
                    }
                }
            
        ])

        // return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,// because aggregrate return value in array form
            })
        }

        // if no rating exists
        return res.status(200).json({
            success:true,
            message: "average Rating is 0, no rating given till now",
            averageRating:0,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ 
            success:false,
            message:error.message,
        })
    }
}

// get all rating and reviews

exports.getAllRating = async (req, res) => {
  try {
    const allReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exc();

    return res.status(200).json({
      success: true,
      message: "all reviews fetched successfully",
      data: allReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
