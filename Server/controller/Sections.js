const Section=require("../models/Section");
const Course=require("../models/Course");


exports.createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;

    // validation
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create new section
    const newSection = await Section.create({
      sectionName:sectionName,
    });
    // push new section in courses with section obj id
    const updatedCourse = await Course.findByIdAndUpdate(
       {_id:courseId} ,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate("courseContent").exec();

    console.log(updatedCourse);
    // in which way i use populate here so here we get section and subsection's details rather than obj id

    // return response
    return res.status(200).json({
      success: true,
      message: "section created sucessfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "section creation faild",
    });
  }
};


exports.updateSection = async (req, res) => {
  try {
    // fetch
    const { sectionName, sectionId } = req.body;
    // validate
    if (!sectionName || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    const updated = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "section updated sucessfully",
      //updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "section updation faild",
    });
  }
};


exports.deleteSection = async (req, res) => {
  try {
    //const {sectionId}=req.body;
    // let that we are sending id in params
    const { sectionId } = req.params;

    await Section.findByIdAndDelete(sectionId);

    //return response
    return res.status(200).json({
      success: true,
      message: "section deleted sucessfully",
      //updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "section deletion failed",
      //updated
    });
  }
};