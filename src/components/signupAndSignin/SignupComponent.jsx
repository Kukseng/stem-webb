import React from "react";
import signupIcon from "../../assets/iconsvg/signup.svg";

export function SignupComponent() {
  return (
    <>
      <h1 className="font-suwannaphum font-bold text-4xl flex justify-center m-10 text-center">
        ស្វាគមន៍មកកាន់ <span className="text-primary ml-2">ISTEM</span>
      </h1>

      {/* Main container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-8">
        {/* Icon section */}
        <div className="w-full max-w-[500px]">
          <img
            className="w-full max-w-[400px] md:max-w-[500px] mx-auto"
            src={signupIcon}
            alt="Sign in"
          />
        </div>

        {/* Sign-in form */}
        <div className="font-suwannaphum flex flex-col w-full sm:w-[90%] md:w-[400px] xl:w-[500px] max-w-[500px] mx-auto p-6 md:p-10 xl:p-12 bg-primary rounded-2xl shadow-xl">
          <div className="font-light text-white text-2xl pb-4">ចុះឈ្មោះ</div>
          <div className="text-sm font-light text-white pb-6">
            ស្វាគមន៍ការចុះឈ្មោះចូលគណនីថ្មី
          </div>

          {/* Form */}
          <form className="flex flex-col">
            {/* Name Field */}
            <div className="pb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                ឈ្មោះ
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-gray-400 focus:border-gray-400"
                placeholder="ឈ្មោះរបស់អ្នក"
                autoComplete="off"
              />
            </div>

            {/* Email Field */}
            <div className="pb-3">
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

            {/* Password Field */}
            <div className="pb-6">
              <label className="block mb-2 text-sm font-medium text-white">
                លេខសម្ងាត់
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-gray-400 focus:border-gray-400"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg text-sm px-5 py-3 mb-6"
            >
              ចុះឈ្មោះចូល
            </button>

            {/* Already have an account? */}
            <div className="bg-primary text-sm font-light text-white text-center">
              មានគណនីរួចហើយ?{" "}
              <a href="#" className="font-medium text-gray-200 hover:underline">
                ចូលគណនី
              </a>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-white">ឬ</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Facebook Button */}
            <button className="flex items-center justify-center w-full md:w-36 bg-blue-600 p-3 rounded-md text-white hover:bg-blue-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook mr-2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </button>

            {/* Google Button */}
            <button className="flex items-center justify-center w-full md:w-36 bg-red-600 p-3 rounded-md text-white hover:bg-red-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-google mr-2"
              >
                <path d="M21.8 10.3h-9.7v3.7h5.7a4.9 4.9 0 0 1-1.9 3 5.6 5.6 0 0 1-3.8 1.2 6.3 6.3 0 0 1-4.4-1.8A6 6 0 0 1 6 12.1a6 6 0 0 1 1.7-4.2 6.4 6.4 0 0 1 4.4-1.7c1.6 0 3.1.6 4.2 1.6l2.8-2.8a10 10 0 0 0-7-2.7A10 10 0 0 0 2 12a10 10 0 0 0 3 7.3 9.8 9.8 0 0 0 7 2.7c3.4 0 6.3-1.1 8.3-3.3A9.6 9.6 0 0 0 24 12c0-.6-.1-1.1-.2-1.7z"></path>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;

