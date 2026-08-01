import React from "react";
import { useForm } from "react-hook-form";
import resetpasswordemail from "../../appwrite/passwordRecovery";
import { CommonInput } from "./Common";
import { useSearchParams } from "react-router-dom";
function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  function resetPassword(data) {
    // const newPassword = data.password;
   
    resetpasswordemail.updatePasswordRecovery(userId, secret, data.password);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6-6V9a6 6 0 1112 0v2m-9 0h6a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            Reset Password
          </h2>

          <p className="text-gray-500 mt-2">
            Create a new secure password for your account.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(resetPassword)}>
          <div>
            <CommonInput
              type="password"
              required={true}
              label="New Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </div>
          <div>
            <CommonInput
              type="password"
              required={true}
              label="Confirm New Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Update Password
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
