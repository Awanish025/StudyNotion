import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Navbar from "./components/common/Navbar";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import { Toaster } from "react-hot-toast";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/core/HomePage/Dashbord/MyProfile";
import OpenRoute from "./components/core/HomePage/Auth/OpenRoute";
import PrivateRoute from "./components/core/HomePage/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Setting from "./components/core/HomePage/Dashbord/Setting";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/HomePage/Dashbord/EnrolledCourses";
import Cart from "./components/core/HomePage/Dashbord/Cart/index";
import MyCourses from "./components/core/HomePage/Dashbord/MyCourses/MyCourses";
import AddCourse from "./components/core/HomePage/Dashbord/AddCourse";
import EditCourse from "./components/core/HomePage/Dashbord/EditCourse";
import Instructor from "./components/core/HomePage/Dashbord/InstructorDashboard/Instructor";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Error from "./Pages/Error";

const App = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="flex min-h-screen w-full flex-col bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashbord/cart" element={<Cart />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
