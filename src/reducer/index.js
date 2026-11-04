import { combineReducers } from "@reduxjs/toolkit"; 
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import coursesReducer from "../slices/coursesSlice"
import viewCourseReducer from "../slices/viewCoursesSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  courses: coursesReducer,
  course: coursesReducer,
  viewCourse: viewCourseReducer,
})

export default rootReducer
