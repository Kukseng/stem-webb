// src/components/SignUpPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../api/auth-api";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [register, { isLoading }] = useRegisterMutation();
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      errors.password = "Use at least 8 characters with letters, numbers, and symbols";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the Terms of Service";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSuccessMessage("");

    const registerData = {
      first_name: "Unknown", // Placeholder to satisfy backend
      last_name: "User",     // Placeholder to satisfy backend
      username: formData.username,
      email: formData.email,
      password: formData.password,
      ConfirmPassword: formData.confirmPassword, // Added to match backend requirement
    };

    try {
      console.log("Sending signup data:", registerData);
      const response = await register(registerData).unwrap();
      console.log("Signup response:", response);
      setSuccessMessage("Account created successfully! Redirecting to OTP verification...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error("Signup error:", err);
      if (err.data && err.data.errors) {
        const fieldErrors = Object.entries(err.data.errors).reduce((acc, [key, value]) => {
          acc[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value; // Normalize keys
          return acc;
        }, {});
        setFormErrors(fieldErrors);
      } else if (err.data && err.data.message) {
        setFormErrors({ general: err.data.message });
      } else {
        setFormErrors({ general: "Unable to create account. Please try again." });
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-white">
              <img
                src={logomodified}
                alt="ISTEM"
                className="h-12 w-12 sm:h-16 sm:w-16 object-cover object-center"
              />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-suwannaphum">
              <span className="text-primary">I</span>
              <span className="text-primary">S</span>
              <span className="text-primary">T</span>
              <span className="text-primary">E</span>
              <span className="text-primary">M</span>
            </h1>
          </div>
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <Link to="/help" className="text-sm text-primary hover:text-purple-500 transition-colors">
          Need help?
        </Link>
      </div>

      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-3xl p-5 w-full md:items-center">
        <div className="w-full md:w-1/2 px-4 md:px-6">
          <h2 className="font-bold text-xl sm:text-2xl text-primary">Create Account</h2>
          <p className="text-sm mt-2 text-gray-600">Join our educational platform</p>

          {successMessage && (
            <div className="mt-4 p-2 bg-green-50 border border-green-200 text-green-600 text-sm rounded">
              {successMessage}
            </div>
          )}
          {formErrors.general && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {formErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 sm:mt-6">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1">
                Username
              </label>
              <input
                id="username"
                className="p-2 sm:p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {formErrors.username && (
                <p className="text-red-600 text-xs mt-1">{formErrors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                id="email"
                className="p-2 sm:p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="p-2 sm:p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="gray"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="gray"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters with a mix of letters, numbers & symbols
              </p>
              {formErrors.password && (
                <p className="text-red-600 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  className="p-2 sm:p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="gray"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="gray"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.confirmpassword && (
                <p className="text-red-600 text-xs mt-1">{formErrors.confirmpassword}</p>
              )}
            </div>

            <div className="mt-1">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-600 hover:text-purple-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              {formErrors.agreeTerms && (
                <p className="text-red-600 text-xs mt-1">{formErrors.agreeTerms}</p>
              )}
            </div>

            <button
              type="submit"
              className={`mt-4 bg-primary rounded-[40px] text-white py-2 sm:py-2.5 hover:bg-hover transition-colors focus:ring-4 focus:ring-purple-300 focus:outline-none ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center text-sm text-gray-600">
            មានគណនីរួចហើយ?{" "}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              ចូល
            </Link>
          </div>
        </div>

        <div className="hidden md:block w-1/2 p-2">
          <div className="relative h-full rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={person}
              alt="Educational-illustration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl">Join Our Learning Community</h3>
              <p className="text-white/90 mt-2">
                Get access to interactive animations, courses, and more
              </p>
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
                    ></path>
                  </svg>
                  Access to premium educational animations
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
                    ></path>
                  </svg>
                  បទពិសោធន៍សិក្សា
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
                    ></path>
                  </svg>
                  Progress tracking & certificates
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

export default SignUpPage;