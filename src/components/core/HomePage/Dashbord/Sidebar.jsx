import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {sidebarLinks} from "../../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { VscSettingsGear } from "react-icons/vsc";
import { logout } from "../../../../services/operation/authAPI";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../../common/ConfirmmationModal";

const Sidebar = () => {         
    const { loading: authloading } = useSelector((state) => state.auth);
    const { user, loading: profileloading } = useSelector((state) => state.profile);
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const [confirmationModal,setConfirmationModal ]=useState(null);

    if (authloading || profileloading) {
        return <div className="mt-20">loading....</div>;
    }

    return (
        <div className=' text-white bg-richblack-800'>
            <div className='hidden min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 lg:flex
        h-[calc[100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if (link.type && link.type !== user?.accountType) {
                            return null; // Skip link if type doesn't match
                        }
                        return (
                           <SidebarLink 
                            key={link.id}       
                            link={link}
                             IconNames={link.icon}
                            />
                        );
                    })}

                    <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600">  </div>

                    <div className="flex flex-col ">
                    <SidebarLink 
                    link={{ name: "Settings", path: "/dashboard/settings" }}
                    IconNames="VscSettingsGear"
                    
                    />
                    <button onClick={ ()=>setConfirmationModal (
                        {
                        text1 : "Are You Sure ?",
                        text2 : "You will be logged out of your Acoount",
                        btn1Text: "Logout",
                        btn2Text : "Cancel",
                        btn1Handler : ()=> dispatch(logout(navigate)),
                        btn2Handler : ()=> setConfirmationModal (null),
                    } 
                    ) } 
                    className="text-sm font-medium text-richblack-300 mx-4 my-4"
                    >
                    <div className=" flex items-center gap-x-2 p-4 ">
                        <VscSignOut className="text-lg" /> 
                        <span  >Logout </span>
                    </div>
                    </button>
                    </div>
                </div>
                
            </div>



         {/* mobile sidebar */}
        <div className='flex lg:hidden fixed bottom-0 justify-between items-center px-2 py-1 bg-richblack-900 z-50 w-full'>
        <div className='flex flex-row gap-1 w-full justify-between'>
                  {sidebarLinks.map((link) => {
                        if (link.type && link.type !== user?.accountType) {
                            return null; // Skip link if type doesn't match
                        }
                        return (
                           <SidebarLink 
                            key={link.id}       
                            link={link}
                             IconNames={link.icon}
                            />
                        );
                    })}
                    <SidebarLink 
                    link={{ name: "Settings", path: "/dashboard/settings" }}
                    IconNames={VscSettingsGear.name}
                    
                    />
            </div>
            

        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default Sidebar;
 