import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/auth-api"; 
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/services/authSlice";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields");
      return;
    }

    setLoginError("");

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await login(loginData).unwrap();

      if (response.access && response.refresh) {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        dispatch(setCredentials({ access: response.access, refresh: response.refresh }));
        navigate("/");
      } else {
        setLoginError("Invalid response format from server. Missing tokens.");
      }
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Invalid response from server. Please try again.";

      if (err.data) {
        if (typeof err.data === "string") {
          errorMessage = err.data;
        } else if (err.data.detail) {
          errorMessage = err.data.detail;
        } else {
          errorMessage = Object.entries(err.data)
            .map(([key, value]) => {
              const errorText = Array.isArray(value) ? value.join(", ") : value;
              return `${key}: ${errorText}`;
            })
            .join("; ");
        }
      }

      setLoginError(errorMessage);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center space-x-2">
            <img
              src={logomodified}
              alt="ISTEM"
              className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 object-cover object-center"
            />
            <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold font-suwannaphum text-primary">
              ISTEM
            </h1>
          </div>
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <Link
          to="/help"
          className="text-sm text-primary hover:text-purple-500 transition-colors"
        >
          Need help?
        </Link>
      </div>

      <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 w-full px-6 md:px-8">
          <h2 className="font-bold text-2xl text-primary">Login</h2>
          <p className="text-sm mt-2 text-gray-600">
            Welcome back to our educational platform
          </p>

          {loginError && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                id="email"
                className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} color="gray" /> : <Eye size={18} color="gray" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className={`mt-4 bg-primary rounded-[40px] text-white py-2.5 hover:bg-purple-700 transition-colors focus:ring-4 focus:ring-purple-300 focus:outline-none ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2 p-2">
          <div className="relative h-full rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={person}
              alt="Educational-illustration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl">សូមស្វាគមន៍ការត្រឡប់មកវិញ!</h3>
              <p className="text-white/90 mt-2">បន្តដំណើរសិក្សារបស់អ្នកជាមួយ ISTEM</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-white text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Access your courses
                </li>
                <li className="flex items-center text-white text-sm font-suwannaphum">
                  <svg
                    className="w-4 h-4 mr-2 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  បន្តការសិក្សារបស់អ្នក
                </li>
                <li className="flex items-center text-white text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Track your progress
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1">
          <Link to="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
          {" • "}
          <Link to="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;