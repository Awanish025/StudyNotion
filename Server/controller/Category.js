const { json } = require("express");
const Category= require("../models/Category");
const Course=require("../models/Course");


// create a createCategory handeler function

exports.createCategory= async(req,res)=>{
    try{

        // fetch data
        const{name,description}=req.body;
        // validate
        if(!name){
            return res.status(401).json({
                success:false,
                message:"all fields are required",
            })
        }

        // create entry in db

        const CategorysDetails=await Category.create({
            name:name,
            description:description,
        })
        console.log(CategorysDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"categorys created sucessfull  y",
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.showAllCategories=async (req,res)=>{
    try{
        const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);

           return res.status(200).json({
            success:true,
            message:"all category return successfully",
            allCategorys,
           })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// category page details

exports.categoryPageDetails=async(req,res)=>{
    try{
        //get category id
        const {categoryId}=req.body;

        // get courses for specified category id
        const selectedCategory = await Category.find(categoryId)
                  .populate("course").exc()

            // validation
            if(!selectedCategory){
                return res.status(404).json({
                    success:false,
                    message:"data not find",
                    
                   }) ;

            }

            const diffCatagories=await Category.find({
                _id:{$ne:categoryId},// ne means not equal
            }).populate("course").exc(); 
            
            // get top selling courses

            const allCategorys=await Category.findById({}).populate("course").exc();

            const allCourses=[...allCategorys.Course];

            const topCourses=allCourses.sort((a,b)=>b.studentEnrolled-a.studentEnrolled);

            // return response
      const top5SellingCourses = topCourses.slice(0, 5); 
             
      return res.status(200).json({
        success: true,
        data: top5SellingCourses,
      });
    }
    catch(error){

    }
}