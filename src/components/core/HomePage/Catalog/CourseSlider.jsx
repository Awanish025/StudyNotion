import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={Courses?.length > 3}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="max-h-[35rem] py-2"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="!h-auto pb-4">
              <Course_Card course={course} Height={"h-[220px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-lg text-richblack-300 py-4">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
