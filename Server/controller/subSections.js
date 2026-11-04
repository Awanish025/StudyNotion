const subSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { title, timeDureation, description, sectionId } = req.body;
    const video = req.files ? (req.files.video || req.files.videoFile) : null;

    if (!title || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
    const duration = timeDureation || `${Math.round(uploadDetails.duration || 0)}`;

    const newSubSection = await subSection.create({
      title: title,
      timeDureation: `${duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
      updatedSection,
    });
  } catch (error) {
    console.error("CREATE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "SubSection creation failed",
      error: error.message,
    });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { title, timeDureation, description, subSectionId, sectionId } = req.body;
    const video = req.files ? (req.files.video || req.files.videoFile) : null;

    const subSec = await subSection.findById(subSectionId);
    if (!subSec) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSec.title = title;
    }
    if (description !== undefined) {
      subSec.description = description;
    }
    if (timeDureation !== undefined) {
      subSec.timeDureation = timeDureation;
    }

    if (video) {
      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
      subSec.videoUrl = uploadDetails.secure_url;
      if (uploadDetails.duration) {
        subSec.timeDureation = `${Math.round(uploadDetails.duration)}`;
      }
    }

    await subSec.save();

    let updatedSection = null;
    if (sectionId) {
      updatedSection = await Section.findById(sectionId).populate("subSection");
    }

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection || subSec,
      newDetails: subSec,
    });
  } catch (error) {
    console.error("UPDATE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "SubSection update failed",
      error: error.message,
    });
  }
};

exports.updateSubSection = exports.updateSubsection;

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    if (sectionId) {
      await Section.findByIdAndUpdate(
        sectionId,
        { $pull: { subSection: subSectionId } }
      );
    } else {
      await Section.updateOne(
        { subSection: subSectionId },
        { $pull: { subSection: subSectionId } }
      );
    }

    await subSection.findByIdAndDelete(subSectionId);

    let updatedSection = null;
    if (sectionId) {
      updatedSection = await Section.findById(sectionId).populate("subSection");
    }

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
      updatedSection,
    });
  } catch (error) {
    console.error("DELETE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "SubSection deletion failed",
      error: error.message,
    });
  }
};
