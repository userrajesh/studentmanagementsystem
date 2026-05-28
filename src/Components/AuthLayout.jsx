import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(
    (state) => state.user_authentication.loginStatus,
  );
  const userData = useSelector((state)=>state.user_authentication.userData)
 
  const schoolData = useSelector((state)=>state.user_authentication.schoolData)
  console.log("Authstatus", authStatus);
  console.log("schooldata on auth layout", schoolData);
  
  console.log("User Data on auth",userData)
  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/");
    } else if (!authentication && authStatus) {
      navigate("/dashboard");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);
  if (loading) {
    return "Loading...";
  } else {
    return <> {children}</>;
  }
  // shortcut for if  else ie ternary operator
  //return loading ? <h1>Loading...</h1> : <>{children}</>;
}
