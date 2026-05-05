import React from "react";
import { useDispatch } from "react-redux";
import userAuth from "../../../appwrite/authConfig";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    userAuth.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div>
      {" "}
      <button className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"  onClick={logoutHandler}>
        logout
      </button>
    </div>
  );
}

export default LogoutBtn;
