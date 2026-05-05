import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
const authStore = configureStore({
reducer: {
    user_authentication: authReducer,
  },
})
export default authStore;
