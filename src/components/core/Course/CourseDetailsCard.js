import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course || {}

  const enrolledStudents =
    course?.studentsEnrolled ||
    course?.studentEnrolled ||
    course?.studentsEnroled ||
    []

  const isEnrolled = Boolean(user && enrolledStudents?.includes(user?._id))

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // Parse instructions safely
  let instructionsList = []
  if (Array.isArray(course?.instructions)) {
    instructionsList = course.instructions
  } else if (typeof course?.instructions === "string") {
    try {
      const parsed = JSON.parse(course.instructions)
      instructionsList = Array.isArray(parsed) ? parsed : [course.instructions]
    } catch (e) {
      instructionsList = [course.instructions]
    }
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-xl bg-richblack-700 p-4 text-richblack-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName || "course thumbnail"}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="yellowButton w-full justify-center rounded-lg bg-yellow-50 py-3 text-base font-semibold text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-[0.98] hover:shadow-none active:scale-95"
              onClick={
                isEnrolled
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {isEnrolled ? "Go To Course" : "Buy Now"}
            </button>
            {!isEnrolled && (
              <button
                onClick={handleAddToCart}
                className="blackButton w-full justify-center rounded-lg border border-richblack-600 bg-richblack-800 py-3 text-base font-semibold text-richblack-5 transition-all duration-200 hover:scale-[0.98] hover:bg-richblack-900 active:scale-95"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
            <p className="my-2 text-xl font-semibold">
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {instructionsList.map((item, i) => {
                return (
                  <p className="flex items-center gap-2" key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 hover:text-yellow-50 transition-colors"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
