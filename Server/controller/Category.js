const Category = require("../models/Category");
const Course = require("../models/Course");

// create a createCategory handler function
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      data: allCategorys,
      allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // get courses for specified category id
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        populate: [
          { path: "instructor" },
          { path: "ratingAndReviews" }
        ],
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoriesExceptSelected.length);
      differentCategory = await Category.findById(categoriesExceptSelected[randomIndex]._id)
        .populate({
          path: "course",
          populate: [
            { path: "instructor" },
            { path: "ratingAndReviews" }
          ],
        })
        .exec();
    }

    // get top selling courses
    const allCategories = await Category.find()
      .populate({
        path: "course",
        populate: [
          { path: "instructor" },
          { path: "ratingAndReviews" }
        ],
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.course || []);
    const mostSellingCourses = allCourses
      .sort((a, b) => (b.studentEnrolled?.length || 0) - (a.studentEnrolled?.length || 0))
      .slice(0, 10);

    const selectedCategoryObj = selectedCategory.toObject();
    selectedCategoryObj.courses = Array.isArray(selectedCategoryObj.course)
      ? selectedCategoryObj.course
      : selectedCategoryObj.course
      ? [selectedCategoryObj.course]
      : [];

    let differentCategoryObj = null;
    if (differentCategory) {
      differentCategoryObj = differentCategory.toObject();
      differentCategoryObj.courses = Array.isArray(differentCategoryObj.course)
        ? differentCategoryObj.course
        : differentCategoryObj.course
        ? [differentCategoryObj.course]
        : [];
    }

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory: selectedCategoryObj,
        differentCategory: differentCategoryObj,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error("CATEGORY PAGE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
