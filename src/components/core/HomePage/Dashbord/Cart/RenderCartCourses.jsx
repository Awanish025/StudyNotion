import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from "../../../../../slices/cartSlice"
import RatingStars from "../../../../common/RatingStars"
import GetAvgRating from "../../../../../utils/avgRating"
import { Link } from 'react-router-dom'

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col divide-y divide-richblack-700">
      {cart?.map((course, index) => {
        const avgRating = GetAvgRating(course?.ratingAndReviews || [])
        return (
          <div
            key={course?._id || index}
            className="flex w-full flex-wrap items-start justify-between gap-6 py-6"
          >
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <Link to={`/courses/${course?._id}`}>
                <img
                  className="h-[148px] w-full sm:w-[220px] rounded-lg object-cover"
                  src={course?.thumbnail}
                  alt={course?.courseName || "course thumbnail"}
                />
              </Link>
              <div className="flex flex-col space-y-2">
                <Link to={`/courses/${course?._id}`}>
                  <p className="text-lg font-semibold text-richblack-5 hover:text-yellow-25 transition-colors">
                    {course?.courseName}
                  </p>
                </Link>
                {course?.category?.name && (
                  <Link
                    to={`/catalog/${course?.category?.name?.split(" ").join("-").toLowerCase()}`}
                    className="text-sm text-richblack-300 hover:text-richblack-100"
                  >
                    {course?.category?.name}
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-yellow-50">{avgRating || 0}</span>
                  <RatingStars Review_Count={avgRating} Star_Size={18} />
                  <span className="text-sm text-richblack-400">
                    ({course?.ratingAndReviews?.length || 0} Ratings)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-4">
              <p className="text-2xl font-bold text-yellow-100">
                ₹ {course?.price}
              </p>
              <button
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-800 py-2 px-3 text-pink-300 text-sm font-medium hover:bg-pink-700/20 hover:border-pink-500 transition-all duration-200"
                onClick={() => dispatch(removeFromCart(course?._id))}
              >
                <RiDeleteBin6Line size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RenderCartCourses
