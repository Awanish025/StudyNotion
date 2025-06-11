const mongoose=require("mongoose");

const SubSection=mongoose.Schema({
 title:{
    type:String,
 },
 timeDureation:{
    type:String,
 },
 description:{
    type:String,
 },
 videoUrl:{
    type:String,
 },
})
module.exports=mongoose.model("SubSection" , SubSection);