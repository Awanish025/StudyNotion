import React, { useEffect, useState } from 'react'
import RatingStars from '../../../common/RatingStars'
import GetAvgRating from '../../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course?._id}`} className="block h-full w-full">
      <div className="flex h-full flex-col justify-between rounded-xl bg-richblack-800 p-3 border border-richblack-700/60 transition-all duration-200 hover:scale-[1.02] hover:border-richblack-600 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={course?.thumbnail}
              alt={course?.courseName || "course thumbnail"}
              className={`${Height || "h-[220px]"} w-full rounded-lg object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 pt-3 pb-1">
            <p
              className="text-lg font-semibold text-richblack-5 line-clamp-1"
              title={course?.courseName}
            >
              {course?.courseName}
            </p>
            <p className="text-sm text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-yellow-50">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                ({course?.ratingAndReviews?.length || 0} Ratings)
              </span>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-richblack-700/50 mt-2">
          <p className="text-xl font-bold text-richblack-5">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
