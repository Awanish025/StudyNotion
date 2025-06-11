const express=require("express");

const router=express.Router();

const {createCourse,getAllCourses,getCoursesDetails}=require("../controller/Courses");
const {auth,isStudent,isAdmin,isInstructor}=require("../middelwares/auth");
const {isDemo}=require("../middelwares/isDemo");

const {createSection,updateSection, deleteSection}=require("../controller/Sections");
const {createSubSection,updateSubSection,deleteSubSection}=require("../controller/subSections");


// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    
  } = require("../controller/Category")


router.post("/createCourse",auth,isInstructor,createCourse);

router.get("/getAllCourses",getAllCourses);

router.get("/getCourseDetails",getCoursesDetails);

//**************section**************
router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);



// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)







module.exports=router;
