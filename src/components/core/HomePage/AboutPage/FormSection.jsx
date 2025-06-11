import React from "react";
import ContactUsForm from "../../../common/ContactUsForm";

const FormSection =()=>{
    return (
        <div className=" flex flex-col mx-auto items-center mb-10 ">
           <h1 className=" text-richblack-5 text-4xl font-bold" >Get in Touch</h1>
           <p className=" text-richblack-500">We'd love to here for you, Please fill out this form.</p>
           <div><ContactUsForm/></div>
        </div>
    )
}
export default FormSection