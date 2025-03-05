import React from "react";
import forgotPasswordIcon from "../../assets/iconsvg/signup.svg";
import { Link } from "react-router";

  const  ForgotPassword = () => {
  return (
    <>
      <h1 className="font-suwannaphum font-bold text-4xl flex justify-center m-10 text-center">
        ភ្លេចពាក្យសម្ងាត់? <span className="text-primary ml-2">ISTEM</span>
      </h1>

      {/* Main container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-8">
        {/* Icon  */}
        <div className="w-full max-w-[500px]">
          <img
            className="w-full max-w-[400px] md:max-w-[500px] mx-auto"
            src={forgotPasswordIcon}
            alt="Forgot Password"
          />
        </div>

        {/* Forgot Password Form */}
        <div className="font-suwannaphum flex flex-col w-full sm:w-[90%] md:w-[400px] xl:w-[500px] max-w-[500px] mx-auto p-6 md:p-10 xl:p-12 bg-primary rounded-2xl shadow-xl">
          <div className="font-light text-white text-2xl pb-4">
            កំណត់ពាក្យសម្ងាត់ឡើងវិញ
          </div>
          <div className="text-sm font-light text-white pb-6">
            សូមបញ្ចូលអ៊ីមែលរបស់អ្នក ដើម្បីទទួលបានការកំណត់ពាក្យសម្ងាត់ថ្មី
          </div>

          {/* Form */}
          <form className="flex flex-col">
            {/* Email Field */}
            <div className="pb-6">
              <label className="block mb-2 text-sm font-medium text-white">
                អុីមែល
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-gray-400 focus:border-gray-400"
                placeholder="youremail@gmail.com"
                autoComplete="off"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg text-sm px-5 py-3 mb-6"
            >
              បញ្ជូនពាក្យសម្ងាត់
            </button>

            {/* Back to Login */}
            <div className="bg-primary text-sm font-light text-white text-center">
              ត្រឡប់ទៅ{" "}
              {/* this like will navagate to signin page */}
              <Link to="/ចូលគណនី" className="font-medium text-gray-200 hover:underline">
                ចូលគណនី
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
