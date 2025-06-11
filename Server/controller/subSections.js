const subSection = require("../models/SubSection");
const section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");


exports.createSubSection = async (req, res) => {
  try {
    // fetch data
    const { title, timeDureation, description, sectionId } = req.body;
     const video=req.files.videoFile;
    // validation
    if (!title || !timeDureation || !description || !video || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload to cloudinary
    const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);


    const newSubSection = await subSection.create({
      title:title,
      timeDureation:timeDureation,
      description:description,
      videoUrl:uploadDetails.secure_url,
    });

    // push sub section in section

    const updatedSection = await section.findByIdAndUpdate(
      {_id:sectionId}, // may be there should a mistake
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    ); 
    // add populate here to log details

    // return response
    return res.status(200).json({
      success: true,
      message: "subSection created sucessfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "subSection creation failed",
      
    });
  }
};


// once validate below because its a TODO 


exports.updateSubsection =async(req,res)=>{
  try{
    // fetch data
    const {title, timeDureation, description,subSectionId}=req.body;
    const video =req.files.videoFile;
    // validate
    if (!title || !timeDureation || !description || !video || !subSectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // const sectonDetails=await Section.findById(sectionId);

    // const subSectionId=sectonDetails.subSection;
    let videoUrl;
     if(video){
      const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
       videoUrl = uploadDetails.secure_url;
     }
   
    const newDetails=await subSection.findByIdAndUpdate(subSectionId,
      {title,
       timeDureation,
       description,
      // videoUrl:uploadDetails.secure_url,
      ...(videoUrl && { videoUrl }), // Update video URL only if a new video is uploaded

      },
      {new:true},

    )
     // return response
     return res.status(200).json({
      success: true,
      message: "subSection updated sucessfully",
      newDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "subSection updation faild",
    });
  }
   
}


exports.deleteSubSection=async(req,res)=>{
  try{
     const {subSectionId}=req.body;

    // When a SubSection is deleted, it should also be removed from the array of subSection IDs in the Section model.
     // Remove the subsection reference from the corresponding section
    await Section.updateOne(
      { subSection: subSectionId },
      { $pull: { subSection: subSectionId } }
    );
    
     await subSection.findByIdAndDelete(subSectionId);

    // return response
    return res.status(200).json({
      success: true,
      message: "subSection deleted sucessfully",
      
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "subSection deletion faild",
    });
  }
}