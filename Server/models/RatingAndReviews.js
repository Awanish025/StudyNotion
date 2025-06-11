const mongoose=require("mongoose");


const RatingAndReviewSchema=mongoose.Schema({
 user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user",
 },
 course:{
   type:mongoose.Schema.Types.ObjectId,
   required:true,
   ref:"course",
   index:true,
 },
 rating:{
    type:Number,
    reuired:true,
    
 },
 review:{
    type:String,
    reuired:true,
    
 },

  
})
module.exports=mongoose.model("RatingAndReviews" , RatingAndReviewSchema);