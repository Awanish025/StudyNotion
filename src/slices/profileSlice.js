import { createSlice } from "@reduxjs/toolkit";

const initialstate ={
   
    user:null,

}

const profileSlice = createSlice ({
    name:"profile",
    initialState:initialstate,
    reducers:{
        setuser(state,value){
            state.user=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
    }
})

export const {setuser} = profileSlice.actions;
export default profileSlice.reducer;