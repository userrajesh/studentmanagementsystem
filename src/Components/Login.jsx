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
          console.log(schoolData,"school Data on login")
          dispatch(
            authLogin({
              userData,
              schoolData,
            }),
          );
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
      <div className="w-full max-w-sm bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit(login)}>
          <h5 className="text-xl font-semibold text-gray-900 mb-6">
            Sign in to our platform
          </h5>

          {/* <!-- Email --> */}
          <div className="mb-4">
            <CommonInput
              type="email"
              required={true}
              placeholder="example@company.com"
              label="Your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>

          {/* <!-- Password --> */}
          <div>
            <CommonInput
              type="password"
              required={true}
              placeholder="••••••••"
              label="Your Password"
              {...register("password", {
                required: "password is required",
              })}
            />
          </div>

          {/* <!-- Remember + Forgot --> */}
          <div className="flex items-center mt-6 mb-6">
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

            <a
              href="#"
              className="ml-auto text-sm text-blue-600 hover:underline"
            >
              Lost password?
            </a>
          </div>

          {/* <!-- Login Button --> */}
          <CommonButton type="submit" text="Login to your account" />

          {/* <!-- Register --> */}
          <p className="text-sm text-gray-600 mt-4">
            Not registered?
            <Link
              to={"/registeruser"}
              className="text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
