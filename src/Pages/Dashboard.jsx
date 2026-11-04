import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/HomePage/Dashbord/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] overflow-hidden bg-richblack-900">
      <Sidebar />
      <div className="h-full flex-1 overflow-y-auto overflow-x-hidden bg-richblack-900">
        <div className="py-6 pb-20 lg:pb-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
