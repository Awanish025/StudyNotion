const Section = require("../models/Section");
const Course = require("../models/Course");

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
      sectionName: sectionName,
    });

    // push new section in courses with section obj id
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Section creation failed",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    let updatedCourse = null;
    if (courseId) {
      updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse,
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Section update failed",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.body.sectionId || req.params.sectionId;
    const courseId = req.body.courseId;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID is required",
      });
    }

    await Section.findByIdAndDelete(sectionId);

    let updatedCourse = null;
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { courseContent: sectionId },
      });

      updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
    }

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Section deletion failed",
      error: error.message,
    });
  }
};
