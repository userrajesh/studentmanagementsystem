import React from "react";
import { CommonInput } from "./Common";
import { useForm } from "react-hook-form";
import resetpasswordemail from "../../appwrite/passwordRecovery"

function VerifyEmail() {
  const { register, handleSubmit,} = useForm();
  const sendEmail = async (data) => {
    try{
      await resetpasswordemail.sendRecoveryEmail(data.email);
      alert ('email sent successfully ')
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h3 className="text-3xl font-bold mt-4 text-gray-500">
            Verify Email
          </h3>

          <p className="text-gray-500 mt-2">
            Enter registered Email to reset password.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(sendEmail)}>
          <div>
            <CommonInput
              type="email"
                required={true}
                label="Email"
                {...register("email", {
                  required: true,
                })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Get Reset Link
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

export default VerifyEmail;
