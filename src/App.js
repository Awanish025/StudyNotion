//import React from 'react';
//import Products from './components/products';
import { Route,Routes } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Navbar from "./components/common/Navbar";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import { Toaster } from "react-hot-toast";

const App=()=>{
  
    return (
       <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter " >
        <Navbar/>
        
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
       </Routes>
       <Toaster />
        </div>
    
    );
}
export default App;

