import React, { Children, useState } from "react";
import userAuth from "../../appwrite/authConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  CommonInput,
  CommonButton,
  CommonSelect,
} from "../Components/Common/index";
import { useForm } from "react-hook-form";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const create = async (data) => {
    setError("");
    try {
      const session = await userAuth.createUser(data);
      if (session) {
        const userData = await authservice.getCurrentUser();
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
      {/* Heading */}
      <h5 className="text-xl font-semibold text-gray-900 mb-6">
        Create Your Account
      </h5>

      <p className="text-gray-600 mt-2">
        Start your website in seconds. Already have an account?
        <Link
          to={"/"}
          className="text-blue-600 hover:underline font-medium ml-1"
        >
          Login Here
        </Link>
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(create)} className="mt-6">
        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <CommonInput
              type="email"
              label="Enter Email"
              placeholder="name@company.com"
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

          {/* Full Name */}
          <div>
            <CommonInput
              type="text"
              label="Enter Your Name"
              placeholder="e.g Rajesh Mandal"
              {...register("name", {
                required: true,
              })}
            />
          </div>

          {/* Country */}
          <div>
            <CommonSelect
              options={["India", "China", "Nepal"]}
              label="Country"
              className="mb-4"
              {...register("status", { required: true })}
            />
          </div>

          {/* Password */}
          <div>
            <CommonInput
              type="password"
              label="Choose a password"
              placeholder="••••••••"
              {...register("password", {
                required: true,
              })}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2.5 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          Sign up with Google
        </button>

        {/* Apple Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2.5 mt-3 hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.365 1.43c0 1.14-.42 2.22-1.14 3.03-.78.87-2.04 1.54-3.15 1.47-.12-1.08.39-2.25 1.14-3.03.78-.87 2.1-1.5 3.15-1.47zM21.84 17.16c-.57 1.29-.84 1.86-1.56 2.97-1.02 1.56-2.46 3.51-4.26 3.54-1.62.03-2.04-1.05-4.2-1.05-2.16 0-2.61 1.02-4.23 1.08-1.8.06-3.18-1.77-4.2-3.33C.42 16.29-.9 10.98 2.22 7.2c1.53-1.89 3.93-2.97 6.18-2.97 1.95 0 3.18 1.08 4.8 1.08 1.62 0 2.61-1.08 4.77-1.08 1.92 0 3.96 1.05 5.49 2.85-4.83 2.64-4.05 9.54-.57 10.08z" />
          </svg>
          Sign up with Apple
        </button>

        {/* Terms */}
        <div className="mt-6 space-y-3 mb-4">
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1" />
            <span>
              By signing up, you agree to the{" "}
              <a className="text-blue-600 hover:underline">Terms of Use</a> and{" "}
              <a className="text-blue-600 hover:underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Submit */}
        <CommonButton type="submit" text="Create an account" />
      </form>
    </div>
  );
}

export default Register;
