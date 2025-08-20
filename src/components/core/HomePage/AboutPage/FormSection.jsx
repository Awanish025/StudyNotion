import React from "react";
import ContactUsForm from "../../../common/ContactUsForm";

const FormSection = () => {
  return (
    <div className="mx-auto mt-20 w-11/12 max-w-maxContent flex flex-col items-center gap-6 text-white ">
      {/* Centered text container only */}
      <div className="text-center  space-y-5 ">
        <h1 className="text-4xl font-bold text-richblack-5">Get in Touch</h1>
        <p className="max-w-[600px] text-richblack-300">
          We'd love to hear from you. Please fill out the form below and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Form will have its own alignment */}
     <div className="lg:w-[720px] w-full ">
     <ContactUsForm />
     </div>
    </div>
  );
};

export default FormSection;

