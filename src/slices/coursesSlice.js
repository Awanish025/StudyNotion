import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload;
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
        resetCoursesState: (state) => {
            state.step = 1;
            state.courses = null;
            state.editCourse = false;
            state.paymentLoading = false;
        },
    },
});

export const { setStep, setCourses, setEditCourse, setPaymentLoading, resetCoursesState } = coursesSlice.actions;
export default coursesSlice.reducer;
