import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RiShoppingCartLine } from "react-icons/ri"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { totalItems, cart } = useSelector((state) => state.cart)

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <h1 className="mb-8 text-3xl font-bold text-richblack-5">Your Cart</h1>
      <p className="border-b border-b-richblack-700 pb-2 font-semibold text-richblack-400">
        {cart?.length || 0} Courses in Cart
      </p>

      {cart && cart.length > 0 ? (
        <div className="mt-6 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-richblack-800 text-richblack-300">
            <RiShoppingCartLine size={36} />
          </div>
          <p className="text-2xl font-semibold text-richblack-5">Your Cart is Empty</p>
          <p className="max-w-md text-sm text-richblack-300">
            Looks like you haven't added any courses to your cart yet. Explore our top courses and find something to learn!
          </p>
          <Link
            to="/catalog/python"
            className="mt-2 rounded-lg bg-yellow-50 px-6 py-2.5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  )
}
