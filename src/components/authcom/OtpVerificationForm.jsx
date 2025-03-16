import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useVerifyOtpMutation } from "../../api/auth-api";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otpCode, setOtpCode] = useState("");
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpCode) {
      setOtpError("សូមបញ្ចូលកូដ OTP");
      return;
    }

    setOtpError("");

    const otpData = {
      email,
      otp_code: otpCode,
    };

    try {
      console.log("កំពុងផ្ញើទិន្នន័យ OTP:", otpData);
      const response = await verifyOtp(otpData).unwrap();
      console.log("ការផ្ទៀងផ្ទាត់ OTP ឆ្លើយតប:", response);
      navigate("/login"); 
    } catch (err) {
      console.error("កំហុសក្នុងការផ្ទៀងផ្ទាត់ OTP:", err);
      const errorMessage = err.data?.detail || "OTP មិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។";
      setOtpError(errorMessage);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 md:p-8">
        <h2 className="font-bold text-2xl text-primary">ផ្ទៀងផ្ទាត់ OTP</h2>
        <p className="text-sm mt-2 text-gray-600">បញ្ចូលកូដ OTP ដែលបានផ្ញើទៅ {email}</p>

        {otpError && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {otpError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div>
            <label htmlFor="otpCode" className="text-sm font-medium text-gray-700 block mb-1">
              កូដ OTP
            </label>
            <input
              id="otpCode"
              className="p-2.5 rounded-lg border w-full focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              type="text"
              name="otpCode"
              placeholder="បញ្ចូលកូដ ៦ ខ្ទង់"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
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
                កំពុងផ្ទៀងផ្ទាត់...
              </span>
            ) : (
              "ផ្ទៀងផ្ទាត់ OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ត្រឡប់ទៅ{" "}
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
            ចុះឈ្មោះ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OtpVerificationPage;