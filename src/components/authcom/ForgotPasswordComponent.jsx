// src/components/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { useForgotPasswordMutation } from "../../api/auth-api"; // Adjusted path
import logomodified from "../../assets/images/logo/o-removebg-preview.png";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setFormError("Please enter your email");
      return;
    }

    setFormError("");
    setMessage("");

    try {
      console.log("Sending forgot password request:", { email });
      const response = await forgotPassword({ email }).unwrap();
      console.log("Forgot password response:", response);
      setMessage("A reset link has been sent to your email.");
      setEmail("");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      console.error("Forgot password error:", err);
      let errorMessage = "Failed to send reset link. Please try again.";
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
      setFormError(errorMessage);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
              <img
                src={logomodified}
                alt="ISTEM"
                className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 object-cover object-center"
              />
            </div>
            <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold font-suwannaphum">
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

      <div className="bg-white rounded-2xl shadow-lg max-w-md p-6 md:p-8">
        <h2 className="font-bold text-2xl text-primary">Reset Password</h2>
        <p className="text-sm mt-2 text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        {message && (
          <div className="mt-4 p-2 bg-green-50 border border-green-200 text-green-600 text-sm rounded">
            {message}
          </div>
        )}
        {formError && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {formError}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`mt-4 bg-primary rounded-[40px] text-white py-2.5 hover:bg-hover transition-colors focus:ring-4 focus:ring-purple-300 focus:outline-none ${
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
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Login
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1">
          <Link to="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>
          {" • "}
          <Link to="/terms" className="underline hover:text-gray-700">Terms of Service</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;