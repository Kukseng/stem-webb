import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/services/authSlice";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader, X } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [loginError, setLoginError] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        dispatch(setCredentials({ access: response.access, refresh: response.refresh }));
        navigate("/");
      } else {
        setLoginError("Invalid response format from server. Missing tokens.");
      }
    } catch (err) {
      console.error("Login error:", err.status, err.data);
      if (err.status === 'FETCH_ERROR') {
        setLoginError("Network error. Please check your internet connection.");
      } else {
        setLoginError(err.data?.detail || "Login failed. Please try again.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google credential response:", credentialResponse);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google token:", decoded);
      const { email, given_name, sub: googleId } = decoded;
      const tempPassword = `Google${googleId}`;
      
      setGoogleEmail(email);
      setFormData((prev) => ({ ...prev, email }));

      const loginData = { email, password: tempPassword };
      console.log("Attempting Google login:", loginData);
      try {
        const loginResponse = await login(loginData).unwrap();
        console.log("Google login response:", loginResponse);
        if (loginResponse.access && loginResponse.refresh) {
          localStorage.setItem("access_token", loginResponse.access);
          localStorage.setItem("refresh_token", loginResponse.refresh);
          dispatch(setCredentials({ access: loginResponse.access, refresh: loginResponse.refresh }));
          navigate("/");
          return;
        }
      } catch (loginErr) {
        if (loginErr.status === 'FETCH_ERROR') {
          setLoginError("Network error. Please check your internet connection.");
          return;
        }
        console.log("Google login failed (likely not registered):", loginErr.status, loginErr.data);
      }

      const registerData = {
        first_name: given_name || "Google",
        last_name: "User",
        username: email.split("@")[0],
        email,
        password: tempPassword,
        ConfirmPassword: tempPassword,
      };
      console.log("Attempting Google signup:", registerData);
      try {
        const registerResponse = await register(registerData).unwrap();
        console.log("Google signup response:", registerResponse);
        const autoLoginResponse = await login(loginData).unwrap();
        if (autoLoginResponse.access && autoLoginResponse.refresh) {
          localStorage.setItem("access_token", autoLoginResponse.access);
          localStorage.setItem("refresh_token", autoLoginResponse.refresh);
          dispatch(setCredentials({ access: autoLoginResponse.access, refresh: autoLoginResponse.refresh }));
          navigate("/");
        }
      } catch (registerErr) {
        if (registerErr.status === 'FETCH_ERROR') {
          setLoginError("Network error during signup. Please check your internet connection.");
          return;
        }
        console.error("Google signup error:", registerErr.status, registerErr.data);
        setLoginError("Failed to sign up with Google. Please try again.");
      }
    } catch (err) {
      console.error("Google token decode error:", err);
      setLoginError("Failed to process Google login. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed - popup or config issue");
    setLoginError("Google login failed. Please try again.");
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <header className="w-full max-w-6xl flex justify-between items-center absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logomodified} alt="ISTEM logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-cover transition-transform duration-300 hover:scale-105" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-suwannaphum text-primary">ISTEM</h1>
        </Link>
        <Link to="/help" className="text-sm text-primary hover:text-purple-500 transition-colors font-medium px-4 py-2 border border-primary rounded-full hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300">Need help?</Link>
      </header>

      <main className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto my-16 overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10">
            <div className="max-w-md mx-auto">
              <h2 className="font-bold text-2xl sm:text-3xl text-primary animate-fade-in">Welcome back</h2>
              <p className="text-sm mt-2 text-gray-600 animate-fade-in-delayed">Sign in to continue your educational journey</p>

              {loginError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-start justify-between transition-opacity duration-300 animate-fade-in">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{loginError}</span>
                  </div>
                  <button onClick={() => setLoginError("")} className="text-red-600 hover:text-red-800 transition-colors focus:outline-none" aria-label="Dismiss error message">
                    <X size={18} />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
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
                    disabled={googleEmail !== ""}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      className="p-3 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
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
                </div>

                <div className="flex flex-wrap items-center justify-between gap-y-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors duration-300"
                      aria-label="Remember me"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline">Forgot password?</Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`mt-2 bg-primary rounded-full text-white py-3 font-medium hover:bg-purple-700 transition-all duration-300 focus:ring-4 focus:ring-purple-300 focus:outline-none flex items-center justify-center ${
                    isLoginLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
                  }`}
                  disabled={isLoginLoading}
                  aria-label={isLoginLoading ? "Signing in..." : "Sign in"}
                >
                  {isLoginLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Or sign in with</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signin_with"
                  width="300"
                />
              </div>

              <div className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline">Create account</Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-primary to-purple-700">
            <div className="h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="absolute inset-0 opacity-20">
                <img className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 hover:scale-105" src={person} alt="Educational illustration" />
              </div>
              <div></div>
              <div className="relative z-10 text-white pt-40 animate-fade-in-delayed">
                <h3 className="font-bold text-2xl lg:text-3xl">សូមស្វាគមន៍ការត្រឡប់មកវិញ!</h3>
                <p className="text-white/90 mt-2 lg:text-lg">បន្តដំណើរសិក្សារបស់អ្នកជាមួយ ISTEM</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-white text-sm lg:text-base">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Access your personalized courses
                  </li>
                  <li className="flex items-center text-white text-sm lg:text-base font-suwannaphum">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    បន្តការសិក្សារបស់អ្នក
                  </li>
                  <li className="flex items-center text-white text-sm lg:text-base">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Track your progress
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1">
          <Link to="/privacy" className="underline hover:text-gray-700 transition-colors focus:outline-none focus:underline">Privacy Policy</Link>
          {" • "}
          <Link to="/terms" className="underline hover:text-gray-700 transition-colors focus:outline-none focus:underline">Terms of Service</Link>
        </p>
      </footer>
    </section>
  );
};

export default LoginPage;