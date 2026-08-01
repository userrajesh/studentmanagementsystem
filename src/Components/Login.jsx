import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import userAuth from "../../appwrite/authConfig";
import databseconfiguration from "../../appwrite/dbConfig";
import { CommonButton, CommonInput } from "../Components/Common/index";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await userAuth.login(data);
      if (session) {
        const userData = await userAuth.getCurrentUser();
        if (userData) {
          const schoolData = await databseconfiguration.getSchoolByUserId(
            userData.$id,
          );

          // Convert to serializable object
          const plainUserData = JSON.parse(JSON.stringify(userData));

          const plainSchoolData = JSON.parse(JSON.stringify(schoolData));

          dispatch(
            authLogin({
              userData: plainUserData,
              schoolData: plainSchoolData,
            }),
          );
          console.log(schoolData, "school Data on login");

          navigate("/dashboard");
        }

        // if (userData) dispatch(authLogin(userData));
      }
    } catch (error) {
      setError(error?.message || "some thing went wrong during login");
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Sign in to your School Management System
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <CommonInput
            type="email"
            required={true}
            placeholder="example@company.com"
            label="Email Address"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />

          <CommonInput
            type="password"
            required={true}
            placeholder="••••••••"
            label="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />

              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <Link
              to="/verify-email"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <CommonButton
            type="submit"
            text="Login to your account"
            className="w-full"
          />

          <div className="text-center text-sm text-gray-600">
            Not registered?{" "}
            <Link
              to="/registeruser"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
