import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import typo
import { useRegisterMutation } from "../../api/auth-api";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader, X } from "lucide-react"; // Added Lucide icons

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
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Header with logo and help link */}
      <header className="w-full max-w-6xl flex justify-between items-center absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logomodified}
            alt="ISTEM logo"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-cover transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-suwannaphum text-primary">
            ISTEM
          </h1>
        </Link>
        <Link
          to="/help"
          className="text-sm text-primary hover:text-purple-500 transition-colors font-medium px-4 py-2 border border-primary rounded-full hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Need help?
        </Link>
      </header>

      {/* Main content container */}
      <main className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto my-16 overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Form section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10">
            <div className="max-w-md mx-auto">
              <h2 className="font-bold text-2xl sm:text-3xl text-primary animate-fade-in">
                Create Account
              </h2>
              <p className="text-sm mt-2 text-gray-600 animate-fade-in-delayed">
                Join our educational platform
              </p>

              {successMessage && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg flex items-start justify-between transition-opacity duration-300 animate-fade-in">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{successMessage}</span>
                  </div>
                  <button
                    onClick={() => setSuccessMessage("")}
                    className="text-green-600 hover:text-green-800 transition-colors focus:outline-none"
                    aria-label="Dismiss success message"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              {formErrors.general && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-start justify-between transition-opacity duration-300 animate-fade-in">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{formErrors.general}</span>
                  </div>
                  <button
                    onClick={() => setFormErrors((prev) => ({ ...prev, general: "" }))}
                    className="text-red-600 hover:text-red-800 transition-colors focus:outline-none"
                    aria-label="Dismiss error message"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                <div className="relative">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700 block mb-1.5"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="p-3 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-gray-400"
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-label="Username"
                  />
                  {formErrors.username && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.username}</p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 block mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="p-3 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-gray-400"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-label="Email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 block mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="p-3 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} color="gray" /> : <Eye size={18} color="gray" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use at least 8 characters with a mix of letters, numbers & symbols
                  </p>
                  {formErrors.password && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 block mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      className="p-3 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-label="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} color="gray" /> : <Eye size={18} color="gray" />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.confirmPassword}</p>
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
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors duration-300"
                        required
                        aria-required="true"
                        aria-label="Agree to Terms of Service and Privacy Policy"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeTerms" className="text-gray-600">
                        I agree to the{" "}
                        <Link to="/terms" className="text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline">
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
                  className={`mt-4 bg-primary rounded-full text-white py-3 font-medium hover:bg-purple-700 transition-all duration-300 focus:ring-4 focus:ring-purple-300 focus:outline-none flex items-center justify-center ${
                    isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
                  }`}
                  disabled={isLoading}
                  aria-label={isLoading ? "Creating account..." : "Create Account"}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-600">
                មានគណនីរួចហើយ?{" "}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline">
                  ចូល
                </Link>
              </div>
            </div>
          </div>

          {/* Image section - hidden on mobile */}
          <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-primary to-purple-700">
            <div className="h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="absolute inset-0 opacity-20">
                <img
                  className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 hover:scale-105"
                  src={person}
                  alt="Educational illustration"
                />
              </div>
              <div></div> {/* Spacer */}
              <div className="relative z-10 text-white pt-40 animate-fade-in-delayed">
                <h3 className="font-bold text-2xl lg:text-3xl">Join Our Learning Community</h3>
                <p className="text-white/90 mt-2 lg:text-lg">Get access to interactive animations, courses, and more</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-white text-sm lg:text-base">
                    <svg
                      className="w-5 h-5 mr-3 text-green-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Access to premium educational animations
                  </li>
                  <li className="flex items-center text-white text-sm lg:text-base font-suwannaphum">
                    <svg
                      className="w-5 h-5 mr-3 text-green-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    បទពិសោធន៍សិក្សា
                  </li>
                  <li className="flex items-center text-white text-sm lg:text-base">
                    <svg
                      className="w-5 h-5 mr-3 text-green-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Progress tracking & certificates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1">
          <Link to="/privacy" className="underline hover:text-gray-700 transition-colors focus:outline-none focus:underline">
            Privacy Policy
          </Link>
          {" • "}
          <Link to="/terms" className="underline hover:text-gray-700 transition-colors focus:outline-none focus:underline">
            Terms of Service
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default SignUpPage;