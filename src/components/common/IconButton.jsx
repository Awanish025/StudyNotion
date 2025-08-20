import React from "react";
import {FiEdit} from "react-icons/fi"
const IconButton = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type
  }
   )=> {
    return ( 
    <button className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined' 
    disabled={disabled}
    onClick={onClick}
    type={type}>
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
        <FiEdit/>
    </button>
     )
}
export default IconButton;