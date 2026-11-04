import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(token);
  } catch (e) {
    return token;
  }
};

const initialstate = {
  signupData: null,
  loading: false,
  token: getTokenFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
