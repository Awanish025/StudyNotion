import React from "react";
import { FiEdit } from "react-icons/fi";

const IconButton = ({
  text,
  onClick,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  const handleClick = onClick || onclick;
  return (
    <button
      className={`flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 ${
        outline ? "border border-yellow-50 bg-transparent text-yellow-50" : ""
      } ${customClasses || ""}`}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
      <FiEdit />
    </button>
  );
};

export default IconButton;
