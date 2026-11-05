import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyCourse } from '../../../../../services/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBuyCourse = () => {
    const courseIds = cart.map((course) => course._id)
    if (token) {
      buyCourse(token, courseIds, user, navigate, dispatch)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="w-full lg:min-w-[280px] lg:max-w-[340px] rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-bold text-yellow-100">₹ {total}</p>

      <button
        type="button"
        onClick={handleBuyCourse}
        className="w-full rounded-lg bg-yellow-50 py-3 text-center text-base font-semibold text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-[0.98] hover:shadow-none active:scale-95"
      >
        Buy Now
      </button>
    </div>
  )
}

export default RenderTotalAmount
