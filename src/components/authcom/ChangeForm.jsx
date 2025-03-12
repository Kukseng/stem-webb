// src/components/ChangePasswordPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { useChangePasswordMutation } from "../../api/auth-api"; // Adjusted path
import logomodified from "../../assets/images/logo/o-removebg-preview.png";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.old_password || !formData.new_password || !formData.confirm_password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      setFormError("New passwords do not match");
      return;
    }

    setFormError("");
    setMessage("");

    try {
      console.log("Sending change password data:", {
        old_password: formData.old_password,
        new_password: formData.new_password,
      });
      const response = await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
      }).unwrap();
      console.log("Change password response:", response);
      setMessage("Password changed successfully!");
      setFormData({ old_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => navigate("/profile"), 3000);
    } catch (err) {
      console.error("Change password error:", err);
      let errorMessage = "Failed to change password. Please try again.";
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
        <h2 className="font-bold text-2xl text-primary">Change Password</h2>
        <p className="text-sm mt-2 text-gray-600">Update your password below.</p>

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
            <label htmlFor="old_password" className="text-sm font-medium text-gray-700 block mb-1">
              Old Password
            </label>
            <input
              id="old_password"
              className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              type="password"
              name="old_password"
              placeholder="Enter old password"
              value={formData.old_password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="new_password" className="text-sm font-medium text-gray-700 block mb-1">
              New Password
            </label>
            <input
              id="new_password"
              className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              type="password"
              name="new_password"
              placeholder="Enter new password"
              value={formData.new_password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirm_password" className="text-sm font-medium text-gray-700 block mb-1">
              Confirm New Password
            </label>
            <input
              id="confirm_password"
              className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              type="password"
              name="confirm_password"
              placeholder="Confirm new password"
              value={formData.confirm_password}
              onChange={handleChange}
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
                Changing...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link to="/profile" className="font-medium text-purple-600 hover:text-purple-500">
            Profile
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

export default ChangePasswordPage;