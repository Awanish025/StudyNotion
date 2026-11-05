const Course = require("../models/Course");
const Courses = Course;
const User = require("../models/user");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { isInstructor } = require("../middelwares/auth");

// now create course create handler function
exports.createCourse = async (req, res) => {
  try {
    let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions } = req.body;
    const thumbnail = req.files ? req.files.thumbnailImage : null;

    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    const userId = req.user?.id || req.User?.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    let parsedTag = [];
    if (tag) {
      if (Array.isArray(tag)) {
        parsedTag = tag;
      } else {
        try {
          parsedTag = JSON.parse(tag);
        } catch (e) {
          parsedTag = typeof tag === "string" ? tag.split(",").map((t) => t.trim()) : [tag];
        }
      }
    }

    let parsedInstructions = [];
    if (instructions) {
      if (Array.isArray(instructions)) {
        parsedInstructions = instructions;
      } else {
        try {
          parsedInstructions = JSON.parse(instructions);
        } catch (e) {
          parsedInstructions = typeof instructions === "string" ? [instructions] : [];
        }
      }
    }

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: parsedTag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: parsedInstructions,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
      course.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          try {
            course[key] = typeof updates[key] === "string" ? JSON.parse(updates[key]) : updates[key];
          } catch (e) {
            course[key] = updates[key];
          }
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("EDIT COURSE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Course fetching failed",
      error: error.message,
    });
  }
};

exports.getCoursesDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: { path: "user", select: "firstName lastName accountType image" },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    (courseDetails.courseContent || []).forEach((content) => {
      (content.subSection || []).forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration || subSection.timeDureation || 0);
        totalDurationInSeconds += isNaN(timeDurationInSeconds) ? 0 : timeDurationInSeconds;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    const courseObj = courseDetails.toObject ? courseDetails.toObject() : { ...courseDetails };
    courseObj.studentsEnrolled = courseObj.studentEnrolled || courseObj.studentsEnrolled || courseObj.studentsEnroled || [];

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: {
        courseDetails: courseObj,
        totalDuration,
      },
    });
  } catch (error) {
    console.error("GET COURSE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed in finding course details",
      error: error.message,
    });
  }
};

exports.getCourseDetails = exports.getCoursesDetails;

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id || req.User?.id;
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = null;
    try {
      courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      });
    } catch (err) {
      console.log("No course progress found:", err.message);
    }

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    (courseDetails.courseContent || []).forEach((content) => {
      (content.subSection || []).forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration || subSection.timeDureation || 0);
        totalDurationInSeconds += isNaN(timeDurationInSeconds) ? 0 : timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    const courseObj = courseDetails.toObject ? courseDetails.toObject() : { ...courseDetails };
    courseObj.studentsEnrolled = courseObj.studentEnrolled || courseObj.studentsEnrolled || courseObj.studentsEnroled || [];

    return res.status(200).json({
      success: true,
      data: {
        courseDetails: courseObj,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos ? courseProgressCount.completedVideos : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user?.id || req.User?.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .sort({ createdAt: -1 });

    const coursesWithDuration = instructorCourses.map((course) => {
      const courseObj = course.toObject();
      let totalDurationInSeconds = 0;
      (courseObj.courseContent || []).forEach((section) => {
        (section.subSection || []).forEach((sub) => {
          const duration = parseFloat(sub.timeDureation || sub.timeDuration || 0);
          totalDurationInSeconds += isNaN(duration) ? 0 : duration;
        });
      });
      courseObj.totalDuration = convertSecondsToDuration(totalDurationInSeconds);
      return courseObj;
    });

    res.status(200).json({
      success: true,
      data: coursesWithDuration,
    });
  } catch (error) {
    console.error("GET INSTRUCTOR COURSES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studentsEnrolled = course.studentEnrolled || course.studentsEnroled || [];
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    const courseSections = course.courseContent || [];
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection || [];
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
