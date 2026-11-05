import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        (res?.data?.data || res?.data?.allCategorys || []).find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="box-border">
      {/* Hero Section */}
      <div className="bg-richblack-800 py-10">
        <div className="mx-auto flex min-h-[160px] w-11/12 max-w-maxContent flex-col justify-center gap-3">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="font-semibold text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <h1 className="text-3xl font-bold text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-[870px] text-base text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto w-11/12 max-w-maxContent py-10">
        <h2 className="text-2xl font-bold text-richblack-5 lg:text-3xl">
          Courses to get you started
        </h2>
        <div className="my-4 flex border-b border-b-richblack-700 text-sm">
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              active === 1
                ? "border-b-2 border-b-yellow-25 text-yellow-25"
                : "text-richblack-200 hover:text-richblack-50"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              active === 2
                ? "border-b-2 border-b-yellow-25 text-yellow-25"
                : "text-richblack-200 hover:text-richblack-50"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>
        <div className="pt-2">
          <CourseSlider
            Courses={
              active === 1
                ? catalogPageData?.data?.selectedCategory?.courses
                : [...(catalogPageData?.data?.selectedCategory?.courses || [])].reverse()
            }
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-11/12 max-w-maxContent py-10">
        <h2 className="text-2xl font-bold text-richblack-5 lg:text-3xl">
          Top courses in {catalogPageData?.data?.differentCategory?.name || "other categories"}
        </h2>
        <div className="pt-6">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto w-11/12 max-w-maxContent py-10 pb-16">
        <h2 className="text-2xl font-bold text-richblack-5 lg:text-3xl">
          Frequently Bought
        </h2>
        <div className="pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[240px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog
