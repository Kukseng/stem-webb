// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/services/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader, X } from "lucide-react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [loginError, setLoginError] = useState("");

  const primaryColor = "#16789e";
  const accentColor = "#faca15";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields");
      return;
    }
    setLoginError("");
    const loginData = { email: formData.email, password: formData.password };
    console.log("Manual login attempt:", loginData);

    try {
      const response = await login(loginData).unwrap();
      console.log("Login response:", response);
      if (response.access && response.refresh) {
        const userData = { username: response.username || formData.email.split("@")[0] };
        if (rememberMe) {
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);
        } else {
          sessionStorage.setItem("access_token", response.access);
          sessionStorage.setItem("refresh_token", response.refresh);
        }
        dispatch(setCredentials({ access: response.access, refresh: response.refresh, username: userData.username }));
        navigate("/");
      } else {
        setLoginError("Invalid response format from server. Missing tokens.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(err.data?.detail || "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google credential response:", credentialResponse);
    try {
      const idToken = credentialResponse.credential;
      const googleUser = jwtDecode(idToken);
      console.log("Decoded Google user:", googleUser);

      const email = googleUser.email;
      const name = googleUser.name || "Google User";
      // Generate a temporary password (not ideal, but necessary due to API constraints)
      const tempPassword = `Google_${googleUser.sub}_${Date.now()}`; // Unique password based on Google ID and timestamp

      // First, try to log in
      try {
        const loginResponse = await login({ email, password: tempPassword }).unwrap();
        console.log("Google login response:", loginResponse);
        if (loginResponse.access && loginResponse.refresh) {
          const userData = { username: loginResponse.username || email.split("@")[0] };
          localStorage.setItem("access_token", loginResponse.access);
          localStorage.setItem("refresh_token", loginResponse.refresh);
          dispatch(setCredentials({ access: loginResponse.access, refresh: loginResponse.refresh, username: userData.username }));
          navigate("/");
        }
      } catch (loginErr) {
        console.error("Google login error:", loginErr);
        if (loginErr.status === 401 || loginErr.status === 400) {
          // User not found or invalid credentials, attempt to register
          const registerData = {
            first_name: name.split(" ")[0] || "Unknown",
            last_name: name.split(" ").slice(1).join(" ") || "User",
            username: email.split("@")[0] + Math.floor(Math.random() * 1000), // Ensure uniqueness
            email,
            password: tempPassword,
            ConfirmPassword: tempPassword,
          };
          try {
            const registerResponse = await register(registerData).unwrap();
            console.log("Google signup response:", registerResponse);
            setLoginError("Account created successfully! Please verify your OTP.");
            setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
          } catch (registerErr) {
            console.error("Google signup error:", registerErr);
            setLoginError(registerErr.data?.detail || "Failed to sign up with Google. Please try again.");
          }
        } else {
          setLoginError(loginErr.data?.detail || "Failed to sign in with Google. Please try again.");
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
      setLoginError("Failed to process Google login. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed - popup or config issue");
    setLoginError("Google login failed. Please try again or use manual login.");
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
                Welcome Back
              </h2>
              <p className="text-sm mt-2 text-gray-600">Sign in to continue your educational journey</p>

              {loginError && (
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
                    <span>{loginError}</span>
                  </div>
                  <button
                    onClick={() => setLoginError("")}
                    className="text-red-700 hover:text-red-900 focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                    style={{ borderColor: loginError.includes("email") ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor }}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Enter your email address"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm"
                      style={{ borderColor: loginError.includes("credentials") ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
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
                </div>

                <div className="flex flex-wrap items-center justify-between gap-y-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded transition-colors duration-300 focus:ring-2 focus:ring-offset-2"
                      style={{ borderColor: "#d1d5db", color: primaryColor, focusRingColor: primaryColor }}
                      aria-label="Remember me"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium transition-colors focus:outline-none focus:underline"
                    style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                    onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                    onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  className="mt-2 rounded-full text-white py-3 font-medium transition-all duration-300 flex items-center justify-center shadow-md"
                  style={{ backgroundColor: primaryColor }}
                  whileHover={{ scale: isLoginLoading ? 1 : 1.05, backgroundColor: isLoginLoading ? primaryColor : "#0e5c7a" }}
                  whileTap={{ scale: isLoginLoading ? 1 : 0.95 }}
                  disabled={isLoginLoading}
                  aria-label="Sign in"
                >
                  {isLoginLoading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin mr-2 h-4 w-4 text-white" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Or sign in with</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signin_with"
                  width="300"
                  aria-label="Sign in with Google"
                />
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium transition-colors focus:outline-none focus:underline"
                  style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                  onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                  onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                >
                  Create account
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
                <h3 className="font-bold text-2xl lg:text-3xl">សូមស្វាគមន៍ការត្រឡប់មកវិញ!</h3>
                <p className="text-white/90 mt-2 lg:text-lg">បន្តដំណើរសិក្សារបស់អ្នកជាមួយ ISTEM</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Access your personalized courses",
                    "បន្តការសិក្សារបស់អ្នក",
                    "Track your progress",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white text-sm lg:text-base">
                      <svg className="w-5 h-5 mr-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
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

export default LoginPage;