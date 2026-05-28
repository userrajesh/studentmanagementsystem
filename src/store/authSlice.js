import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loginStatus: null,
  userData: null,
  schoolData: null, 
};
const authSlice = createSlice({
  name: "user_authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload.userData;
      state.schoolData = action.payload.schoolData;
    },
    logout: (state, action) => {
      state.loginStatus = false;
      state.userData = null;
      state.schoolData = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
