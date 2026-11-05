import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getFullDetailsOfCourse } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setCourses, setEditCourse, setStep } from "../../../../../slices/coursesSlice"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.courses)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      const courseData = result?.courseDetails || result?.data?.courseDetails
      if (courseData) {
        dispatch(setEditCourse(true))
        dispatch(setStep(1))
        dispatch(setCourses(courseData))
        dispatch(setCourse(courseData))
      }
      setLoading(false)
    })()

    return () => {
      dispatch(setEditCourse(false))
    }
  }, [courseId, token, dispatch])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1200px] py-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[800px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}
