import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import { VscAdd } from "react-icons/vsc";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    ;(async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData?.length) setInstructorData(instructorApiData);
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalAmountGenerated || 0),
    0
  ) || 0;

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalStudentsEnrolled || 0),
    0
  ) || 0;

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-4 space-y-8">
      {/* Greeting Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-sm font-medium text-richblack-300">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className="grid min-h-[350px] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses && courses.length > 0 ? (
        <div className="space-y-6">
          {/* Charts & Statistics row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="flex-1 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm">
                <InstructorChart courses={instructorData} />
              </div>
            ) : (
              <div className="flex-1 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-base font-medium text-richblack-200">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            {/* Total Statistics Card */}
            <div className="flex min-w-[280px] flex-col justify-between rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-medium text-richblack-300">Total Courses</p>
                  <p className="mt-1 text-3xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-richblack-300">Total Students</p>
                  <p className="mt-1 text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-richblack-300">Total Income</p>
                  <p className="mt-1 text-3xl font-semibold text-richblack-50">
                    ₹ {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses preview */}
          <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-sm font-semibold text-yellow-50 hover:underline">
                  View All
                </p>
              </Link>
            </div>
            <div className="my-4 flex flex-col md:flex-row items-start gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-full md:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-lg object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50 truncate">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2 text-xs font-medium text-richblack-300">
                      <p>
                        {course.studentEnrolled?.length || course.studentsEnroled?.length || 0} students
                      </p>
                      <p>|</p>
                      <p>₹ {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State Card - Centered with balanced spacing */
        <div className="flex min-h-[380px] flex-col items-center justify-center rounded-xl border border-dashed border-richblack-700 bg-richblack-800/60 p-10 text-center shadow-lg">
          <p className="text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <p className="mt-2 max-w-[420px] text-sm text-richblack-300">
            Create your first course to begin teaching, reaching students worldwide, and tracking your earnings.
          </p>
          <Link to="/dashboard/add-course" className="mt-6">
            <button className="flex items-center gap-x-2 rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100 cursor-pointer shadow-sm">
              <VscAdd className="text-lg" />
              <span>Create a course</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
