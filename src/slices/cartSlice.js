import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState ={
     totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItem")):0
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addItems(state){
            state.totalItems+=1;
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            toast.success("Item added to cart!");
        },
        removeItems(state){
            state.totalItems-=1;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.error("Item removed from cart!");
        },
        resetCart(state) {
            state.totalItems = 0;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            // toast.success("Cart has been reset!");
        },
       setTotalItems(state,value){
        state.totalItems=value.payload
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
       },
    }
})
export const {addItems,removeItems,resetCart,setTotalItems}=cartSlice.actions;
export default cartSlice.reducer;