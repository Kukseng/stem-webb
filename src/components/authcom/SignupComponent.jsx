// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/auth-api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader, X } from "lucide-react";
import { motion } from "framer-motion";

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

  const primaryColor = "#16789e";
  const accentColor = "#faca15";

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

  const PasswordFeedback = ({ password }) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@$!%*#?&]/.test(password);

    return (
      <div className="text-xs mt-1">
        <p className={hasLength ? "text-green-600" : "text-red-600"}>
          {hasLength ? "✓" : "✗"} At least 8 characters
        </p>
        <p className={hasLetter ? "text-green-600" : "text-red-600"}>
          {hasLetter ? "✓" : "✗"} At least one letter
        </p>
        <p className={hasNumber ? "text-green-600" : "text-red-600"}>
          {hasNumber ? "✓" : "✗"} At least one number
        </p>
        <p className={hasSymbol ? "text-green-600" : "text-red-600"}>
          {hasSymbol ? "✓" : "✗"} At least one symbol
        </p>
      </div>
    );
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
      first_name: "Unknown",
      last_name: "User",
      username: formData.username,
      email: formData.email,
      password: formData.password,
      ConfirmPassword: formData.confirmPassword,
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
      setTimeout(() => navigate("/verify-otp", { state: { email: formData.email } }), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      if (err.data && err.data.errors) {
        const fieldErrors = Object.entries(err.data.errors).reduce((acc, [key, value]) => {
          acc[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value;
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

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google credential response:", credentialResponse);
    try {
      const idToken = credentialResponse.credential;
      const decodedToken = jwtDecode(idToken);
      console.log("Decoded Google token:", decodedToken);

      const googleEmail = decodedToken.email;
      const googleName = decodedToken.name || "Google User";
      const temporaryPassword = "GoogleUser123@*"; // Fixed password for new accounts

      const registerData = {
        first_name: googleName.split(" ")[0] || "Unknown",
        last_name: googleName.split(" ").slice(1).join(" ") || "User",
        username: googleEmail.split("@")[0] + Math.floor(Math.random() * 10000),
        email: googleEmail,
        password: temporaryPassword,
        ConfirmPassword: temporaryPassword,
      };

      console.log("Sending register request with data:", registerData);
      const response = await register(registerData).unwrap();
      console.log("Register response:", response);
      setSuccessMessage("Account created successfully! Redirecting to OTP verification...");
      setTimeout(() => navigate("/verify-otp", { state: { email: googleEmail } }), 1500);
    } catch (err) {
      console.error("Google signup error:", err);
      console.error("Error details:", err.data);

      if (err.status === 400 && err.data?.errors?.email?.includes("user with this email address already exists")) {
        setFormErrors({ general: "This email is already registered. Redirecting to login..." });
        setTimeout(() => navigate("/login", { state: { email: googleEmail, message: "Please log in with your existing password." } }), 2000);
      } else {
        setFormErrors({ general: err.data?.message || "Failed to sign up with Google. Please try again." });
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google signup failed - popup or config issue");
    setFormErrors({ general: "Google signup failed. Please try again or use manual signup." });
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-gray-50 to-yellow-50 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <header className="w-full max-w-6xl flex justify-between items-center absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src={logomodified}
            alt="ISTEM logo"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-suwannaphum" style={{ color: primaryColor }}>
            ISTEM
          </h1>
        </Link>
        <Link
          to="/help"
          className="text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ color: primaryColor, borderColor: primaryColor, backgroundColor: "rgba(22, 120, 158, 0.05)" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(22, 120, 158, 0.1)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(22, 120, 158, 0.05)")}
        >
          Need help?
        </Link>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto my-16 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10">
            <div className="max-w-md mx-auto">
              <h2 className="font-bold text-2xl sm:text-3xl" style={{ color: primaryColor }}>
                Create Account
              </h2>
              <p className="text-sm mt-2 text-gray-600">Join our educational platform</p>

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-start justify-between"
                >
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 mt-0.5 text-green-500"
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
                    className="text-green-700 hover:text-green-900 focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}
              {formErrors.general && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start justify-between"
                >
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 mt-0.5 text-red-500"
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
                    className="text-red-700 hover:text-red-900 focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
                <div className="relative">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Username
                  </label>
                  <input
                    id="username"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                    style={{
                      borderColor: formErrors.username ? "#ef4444" : "#d1d5db",
                      borderWidth: formErrors.username ? "2px" : "1px",
                      focusBorderColor: primaryColor,
                    }}
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    aria-label="Choose a username"
                  />
                  {formErrors.username && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.username}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                    style={{
                      borderColor: formErrors.email ? "#ef4444" : "#d1d5db",
                      borderWidth: formErrors.email ? "2px" : "1px",
                      focusBorderColor: primaryColor,
                    }}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                      style={{
                        borderColor: formErrors.password ? "#ef4444" : "#d1d5db",
                        borderWidth: formErrors.password ? "2px" : "1px",
                        focusBorderColor: primaryColor,
                      }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      aria-label="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ focusRingColor: primaryColor }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                    </button>
                  </div>
                  <PasswordFeedback password={formData.password} />
                  {formErrors.password && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                      style={{
                        borderColor: formErrors.confirmPassword ? "#ef4444" : "#d1d5db",
                        borderWidth: formErrors.confirmPassword ? "2px" : "1px",
                        focusBorderColor: primaryColor,
                      }}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      aria-label="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ focusRingColor: primaryColor }}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="mt-1">
                  <div className="flex items-start">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 rounded transition-colors duration-300 focus:ring-2 focus:ring-offset-2"
                      style={{ borderColor: formErrors.agreeTerms ? "#ef4444" : "#d1d5db", color: accentColor, focusRingColor: primaryColor }}
                      required
                      aria-label="Agree to Terms of Service and Privacy Policy"
                    />
                    <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-600">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="transition-colors focus:outline-none focus:underline"
                        style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                        onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                        onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="transition-colors focus:outline-none focus:underline"
                        style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                        onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                        onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {formErrors.agreeTerms && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.agreeTerms}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="mt-4 rounded-full text-white py-3 font-medium transition-all duration-300 flex items-center justify-center shadow-md"
                  style={{ backgroundColor: primaryColor }}
                  whileHover={{ scale: isLoading ? 1 : 1.05, backgroundColor: isLoading ? primaryColor : "#0e5c7a" }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  disabled={isLoading}
                  aria-label="Create account"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin mr-2 h-4 w-4 text-white" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Or sign up with</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signup_with"
                  width="300"
                  aria-label="Sign up with Google"
                />
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                មានគណនីរួចហើយ?{" "}
                <Link
                  to="/login"
                  className="font-medium transition-colors focus:outline-none focus:underline"
                  style={{ color: primaryColor, hoverColor: accentColor }}
                  onMouseEnter={(e) => (e.target.style.color = accentColor)}
                  onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                >
                  ចូល
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 relative" style={{ background: `linear-gradient(135deg, ${primaryColor}, #0e5c7a)` }}>
            <div className="h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="absolute inset-0 opacity-20">
                <img
                  className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 hover:scale-105"
                  src={person}
                  alt="Educational illustration"
                />
              </div>
              <div></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 text-white pt-40"
              >
                <h3 className="font-bold text-2xl lg:text-3xl">Join Our Learning Community</h3>
                <p className="text-white/90 mt-2 lg:text-lg">Unlock interactive animations, courses, and more</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Access to premium educational animations",
                    "បទពិសោធន៍សិក្សា",
                    "Progress tracking & certificates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white text-sm lg:text-base">
                      <svg
                        className="w-5 h-5 mr-3"
                        style={{ color: accentColor }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>

      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1">
          <Link
            to="/privacy"
            className="underline transition-colors focus:outline-none focus:underline"
            style={{ color: "#6b7280", hoverColor: primaryColor }}
            onMouseEnter={(e) => (e.target.style.color = primaryColor)}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            Privacy Policy
          </Link>
          {" • "}
          <Link
            to="/terms"
            className="underline transition-colors focus:outline-none focus:underline"
            style={{ color: "#6b7280", hoverColor: primaryColor }}
            onMouseEnter={(e) => (e.target.style.color = primaryColor)}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            Terms of Service
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default SignUpPage;