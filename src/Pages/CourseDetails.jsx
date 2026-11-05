import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { addToCart } from "../slices/cartSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course || state.courses || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // State to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const reviews = response?.data?.courseDetails?.ratingAndReviews || []
    const count = GetAvgRating(reviews)
    setAvgReviewCount(count)
  }, [response])

  // Accordion active sections
  const [isActive, setIsActive] = useState([])
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const courseData = response?.data?.courseDetails || {}
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    createdAt,
  } = courseData

  const studentsEnrolled =
    courseData?.studentsEnrolled ||
    courseData?.studentEnrolled ||
    courseData?.studentsEnroled ||
    []

  const isEnrolled = Boolean(user && studentsEnrolled?.includes(user?._id))

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(courseData))
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

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* Hero Section */}
        <div className="mx-auto w-11/12 max-w-maxContent py-8 lg:py-12 2xl:relative">
          <div className="grid justify-items-center lg:justify-items-start xl:max-w-[810px]">
            {/* Mobile Thumbnail */}
            <div className="relative block max-h-[30rem] w-full lg:hidden mb-6">
              <img
                src={thumbnail}
                alt={courseName || "course thumbnail"}
                className="w-full rounded-2xl object-cover max-h-[300px]"
              />
            </div>
            <div className="z-30 flex flex-col justify-center gap-4 text-richblack-5">
              <div>
                <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl lg:text-[42px]">
                  {courseName}
                </h1>
              </div>
              <p className="text-richblack-200 text-base lg:text-lg">
                {courseDescription}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                <span className="font-semibold text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span>{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                <span>{`${studentsEnrolled?.length || 0} students enrolled`}</span>
              </div>
              <div>
                <p className="text-richblack-100">
                  Created By{" "}
                  <span className="font-semibold text-richblack-5">
                    {`${instructor?.firstName || ""} ${instructor?.lastName || ""}`}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-sm sm:text-base text-richblack-100">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {createdAt ? formatDate(createdAt) : "Recently"}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile Buy / Add to Cart Card */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-6 my-6 lg:hidden">
              <p className="text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
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
                  className="blackButton w-full justify-center rounded-lg border border-richblack-600 bg-richblack-800 py-3 text-base font-semibold text-richblack-5 transition-all duration-200 hover:scale-[0.98] hover:bg-richblack-900 active:scale-95"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* Desktop Course Card Floating */}
          <div className="right-0 top-8 hidden w-1/3 max-w-[410px] lg:absolute lg:block">
            <CourseDetailsCard
              course={courseData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-11/12 max-w-maxContent text-start text-richblack-5 py-8">
        <div className="lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-700 bg-richblack-800/40 p-6 sm:p-8 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-richblack-5">
              What you'll learn
            </h2>
            <div className="mt-4 text-richblack-100 leading-relaxed">
              <ReactMarkdown>{whatYouWillLearn || ""}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl sm:text-[28px] font-semibold text-richblack-5">
                Course Content
              </h2>
              <div className="flex flex-wrap justify-between items-center gap-2 text-sm text-richblack-200">
                <div className="flex flex-wrap gap-2">
                  <span>{courseContent?.length || 0} {`section(s)`}</span>
                  <span>•</span>
                  <span>{totalNoOfLectures || 0} {`lecture(s)`}</span>
                  <span>•</span>
                  <span>{response?.data?.totalDuration || "0m"} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25 hover:underline font-medium"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-6">
              <h2 className="text-2xl sm:text-[28px] font-semibold text-richblack-5">
                Author
              </h2>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor?.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName || "User"}%20${instructor?.lastName || ""}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg font-medium text-richblack-5">
                  {`${instructor?.firstName || ""} ${instructor?.lastName || ""}`}
                </p>
              </div>
              <p className="text-richblack-200 text-sm sm:text-base leading-relaxed">
                {instructor?.additionalDetails?.about || "No author description available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails
