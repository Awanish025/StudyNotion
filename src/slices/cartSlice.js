import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

let initialCart = [];
try {
  initialCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  if (!Array.isArray(initialCart)) initialCart = [];
} catch (e) {
  initialCart = [];
}

const calculateTotal = (cartArr) => {
  return cartArr.reduce((sum, item) => sum + (Number(item?.price) || 0), 0);
};

const initialState = {
  cart: initialCart,
  total: calculateTotal(initialCart),
  totalItems: initialCart.length,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload
      if (!course?._id) return;
      const index = state.cart.findIndex((item) => item._id === course._id)

      if (index >= 0) {
        toast.error("Course already in cart")
        return
      }
      state.cart.push(course)
      state.totalItems = state.cart.length
      state.total = calculateTotal(state.cart)
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      toast.success("Course added to cart")
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        state.cart.splice(index, 1)
        state.totalItems = state.cart.length
        state.total = calculateTotal(state.cart)
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        toast.success("Course removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer;
