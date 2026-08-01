import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import userAuth from "../../appwrite/authConfig";
import databseconfiguration from "../../appwrite/dbConfig";
import { login, logout } from "../store/authSlice";

export default function AuthLayout({ children, authentication = true }) {
  const dispatch = useDispatch();

  const authStatus = useSelector(
    (state) => state.user_authentication.loginStatus,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await userAuth.getCurrentUser();

        if (userData) {
          const schoolResponse = await databseconfiguration.getSchoolByUserId(
            userData.$id,
          );
          const schoolData =  schoolResponse|| null;
      
          // Convert to serializable object
          const plainUserData = JSON.parse(JSON.stringify(userData));

          const plainSchoolData = JSON.parse(JSON.stringify(schoolData));

          dispatch(
            login({
              userData: plainUserData,
              schoolData: plainSchoolData,
            }),
          );
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Protected routes
  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // Public routes
  if (!authentication && authStatus) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
