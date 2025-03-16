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

  const primaryColor = "#16789e"; // ISTEM Blue
  const accentColor = "#faca15"; // ISTEM Yellow

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

    if (!formData.username) errors.username = "សូមបញ្ចូលឈ្មោះអ្នកប្រើ";
    if (!formData.email) errors.email = "សូមបញ្ចូលអ៊ីមែល";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "អ៊ីមែលមិនត្រឹមត្រូវ";
    if (!formData.password) errors.password = "សូមបញ្ចូលពាក្យសម្ងាត់";
    else if (!passwordRegex.test(formData.password))
      errors.password = "ប្រើយ៉ាងហោចណាស់ ៨ តួអក្សរ មានអក្សរ លេខ និងនិមិត្តសញ្ញា";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "ពាក្យសម្ងាត់មិនត្រូវគ្នា";
    if (!formData.agreeTerms) errors.agreeTerms = "អ្នកត្រូវយល់ព្រមជាមួយលក្ខខណ្ឌនៃសេវាកម្ម";

    return errors;
  };

  const PasswordFeedback = ({ password }) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@$!%*#?&]/.test(password);

    return (
      <div className="text-[16px] mt-1 font-suwannaphum">
        <p className={hasLength ? "text-green-600" : "text-red-600"}>
          {hasLength ? "✓" : "✗"} យ៉ាងហោចណាស់ ៨ តួអក្សរ
        </p>
        <p className={hasLetter ? "text-green-600" : "text-red-600"}>
          {hasLetter ? "✓" : "✗"} យ៉ាងហោចណាស់មួយអក្សរ
        </p>
        <p className={hasNumber ? "text-green-600" : "text-red-600"}>
          {hasNumber ? "✓" : "✗"} យ៉ាងហោចណាស់មួយលេខ
        </p>
        <p className={hasSymbol ? "text-green-600 " : "text-red-600"}>
          {hasSymbol ? "✓" : "✗"} យ៉ាងហោចណាស់មួយនិមិត្តសញ្ញា
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
      first_name: "មិនស្គាល់",
      last_name: "អ្នកប្រើ",
      username: formData.username,
      email: formData.email,
      password: formData.password,
      ConfirmPassword: formData.confirmPassword,
    };

    try {
      console.log("ផ្ញើទិន្នន័យចុះឈ្មោះ:", registerData);
      const response = await register(registerData).unwrap();
      console.log("ការឆ្លើយតបនៃការចុះឈ្មោះ:", response);
      setSuccessMessage("គណនីត្រូវបានបង្កើតជោគជ័យ! កំពុងប្តូរទៅការផ្ទៀងផ្ទាត់ OTP...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setTimeout(() => navigate("/verify-otp", { state: { email: formData.email } }), 1500);
    } catch (err) {
      console.error("កំហុសក្នុងការចុះឈ្មោះ:", err);
      if (err.data && err.data.errors) {
        const fieldErrors = Object.entries(err.data.errors).reduce((acc, [key, value]) => {
          acc[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value;
          return acc;
        }, {});
        setFormErrors(fieldErrors);
      } else if (err.data && err.data.message) {
        setFormErrors({ general: err.data.message });
      } else {
        setFormErrors({ general: "មិនអាចបង្កើតគណនីបានទេ។ សូមព្យាយាមម្តងទៀត។" });
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("ការឆ្លើយតបនៃ Google:", credentialResponse);
    try {
      const idToken = credentialResponse.credential;
      const decodedToken = jwtDecode(idToken);
      console.log("Decoded Google token:", decodedToken);

      const googleEmail = decodedToken.email;
      const googleName = decodedToken.name || "អ្នកប្រើ Google";
      const temporaryPassword = "GoogleUser123@*"; // Fixed password for new accounts

      const registerData = {
        first_name: googleName.split(" ")[0] || "មិនស្គាល់",
        last_name: googleName.split(" ").slice(1).join(" ") || "អ្នកប្រើ",
        username: googleEmail.split("@")[0] + Math.floor(Math.random() * 10000),
        email: googleEmail,
        password: temporaryPassword,
        ConfirmPassword: temporaryPassword,
      };

      console.log("ផ្ញើសំណើចុះឈ្មោះជាមួយទិន្នន័យ:", registerData);
      const response = await register(registerData).unwrap();
      console.log("ការឆ្លើយតបនៃការចុះឈ្មោះ:", response);
      setSuccessMessage("គណនីត្រូវបានបង្កើតជោគជ័យ! កំពុងប្តូរទៅការផ្ទៀងផ្ទាត់ OTP...");
      setTimeout(() => navigate("/verify-otp", { state: { email: googleEmail } }), 1500);
    } catch (err) {
      console.error("កំហុសក្នុងការចុះឈ្មោះ Google:", err);
      console.error("ព័ត៌មានកំហុស:", err.data);

      if (err.status === 400 && err.data?.errors?.email?.includes("user with this email address already exists")) {
        setFormErrors({ general: "អ៊ីមែលនេះត្រូវបានចុះឈ្មោះរួចហើយ។ កំពុងប្តូរទៅទំព័រចូល..." });
        setTimeout(() => navigate("/login", { state: { email: googleEmail, message: "សូមចូលជាមួយពាក្យសម្ងាត់ដែលមានស្រាប់។" } }), 2000);
      } else {
        setFormErrors({ general: err.data?.message || "ការចុះឈ្មោះជាមួយ Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត។" });
      }
    }
  };

  const handleGoogleError = () => {
    console.error("ការចុះឈ្មោះ Google បរាជ័យ - បញ្ហាបង្អួច ឬការកំណត់");
    setFormErrors({ general: "ការចុះឈ្មោះ Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត ឬប្រើការចុះឈ្មោះដោយដៃ។" });
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-gray-50 to-yellow-50 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      {/* <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div> */}

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src={logomodified}
            alt="ISTEM និមិត្តសញ្ញា"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-cover"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-suwannaphum" style={{ color: primaryColor }}>
            ISTEM
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-auto my-16 overflow-hidden border border-gray-100"
      >
        <div className="flex flex-col md:flex-row">
          {/* SignUp Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="font-bold text-2xl sm:text-3xl font-suwannaphum" style={{ color: primaryColor }}>
                បង្កើតគណនី
              </h2>
              <p className="text-sm mt-2 text-gray-600 font-suwannaphum">ចូលរួមជាមួយវេទិកាអប់រំរបស់យើង</p>

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-start justify-between shadow-sm font-suwannaphum"
                >
                  <div className="flex items-start">
                    <svg className="h-5 w-5 mr-2 mt-0.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
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
                    aria-label="បិទសារជោគជ័យ"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              {/* Error Message */}
              {formErrors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start justify-between shadow-sm font-suwannaphum"
                >
                  <div className="flex items-start">
                    <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
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
                    aria-label="បិទសារកំហុស"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                <div className="relative">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1.5 font-suwannaphum">
                    ឈ្មោះអ្នកប្រើ
                  </label>
                  <input
                    id="username"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md font-suwannaphum placeholder-gray-400"
                    style={{
                      borderColor: formErrors.username ? "#ef4444" : "#d1d5db",
                      borderWidth: formErrors.username ? "2px" : "1px",
                      focusBorderColor: primaryColor,
                      focusRingColor: primaryColor,
                    }}
                    type="text"
                    name="username"
                    placeholder="ជ្រើសរើសឈ្មោះអ្នកប្រើ"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    aria-label="ជ្រើសរើសឈ្មោះអ្នកប្រើ"
                  />
                  {formErrors.username && (
                    <p className="text-red-600 text-xs mt-1 font-suwannaphum">{formErrors.username}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5 font-suwannaphum">
                    អ៊ីមែល
                  </label>
                  <input
                    id="email"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md font-suwannaphum placeholder-gray-400"
                    style={{
                      borderColor: formErrors.email ? "#ef4444" : "#d1d5db",
                      borderWidth: formErrors.email ? "2px" : "1px",
                      focusBorderColor: primaryColor,
                      focusRingColor: primaryColor,
                    }}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក"
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1 font-suwannaphum">{formErrors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1.5 font-suwannaphum">
                    ពាក្យសម្ងាត់
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md font-suwannaphum placeholder-gray-400"
                      style={{
                        borderColor: formErrors.password ? "#ef4444" : "#d1d5db",
                        borderWidth: formErrors.password ? "2px" : "1px",
                        focusBorderColor: primaryColor,
                        focusRingColor: primaryColor,
                      }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="យ៉ាងហោចណាស់ ៨ តួអក្សរ"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      aria-label="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ focusRingColor: primaryColor }}
                      aria-label={showPassword ? "លាក់ពាក្យសម្ងាត់" : "បង្ហាញពាក្យសម្ងាត់"}
                    >
                      {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                    </button>
                  </div>
                  <PasswordFeedback password={formData.password} />
                  {formErrors.password && (
                    <p className="text-red-600 text-xs mt-1 font-suwannaphum">{formErrors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1.5 font-suwannaphum">
                    បញ្ជាក់ពាក្យសម្ងាត់
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md font-suwannaphum placeholder-gray-400"
                      style={{
                        borderColor: formErrors.confirmPassword ? "#ef4444" : "#d1d5db",
                        borderWidth: formErrors.confirmPassword ? "2px" : "1px",
                        focusBorderColor: primaryColor,
                        focusRingColor: primaryColor,
                      }}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      aria-label="បញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ focusRingColor: primaryColor }}
                      aria-label={showConfirmPassword ? "លាក់ការបញ្ជាក់ពាក្យសម្ងាត់" : "បង្ហាញការបញ្ជាក់ពាក្យសម្ងាត់"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1 font-suwannaphum">{formErrors.confirmPassword}</p>
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
                      aria-label="យល់ព្រមជាមួយលក្ខខណ្ឌនៃសេវាកម្ម និងគោលការណ៍ឯកជនភាព"
                    />
                    <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-600 font-suwannaphum">
                      ខ្ញុំយល់ព្រមជាមួយ{" "}
                      <Link
                        to="/terms"
                        className="transition-colors focus:outline-none focus:underline font-suwannaphum"
                        style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                        onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                        onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                      >
                        លក្ខខណ្ឌនៃសេវាកម្ម
                      </Link>{" "}
                      និង{" "}
                      <Link
                        to="/privacy"
                        className="transition-colors focus:outline-none focus:underline font-suwannaphum"
                        style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                        onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                        onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                      >
                        គោលការណ៍ឯកជនភាព
                      </Link>
                    </label>
                  </div>
                  {formErrors.agreeTerms && (
                    <p className="text-red-600 text-xs mt-1 font-suwannaphum">{formErrors.agreeTerms}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="mt-4 rounded-full text-white py-3 font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg font-suwannaphum"
                  style={{ backgroundColor: primaryColor }}
                  whileHover={{ scale: isLoading ? 1 : 1.05, backgroundColor: isLoading ? primaryColor : "#0e5c7a" }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  disabled={isLoading}
                  aria-label="បង្កើតគណនី"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin mr-2 h-4 w-4 text-white" />
                      កំពុងបង្កើតគណនី...
                    </span>
                  ) : (
                    "បង្កើតគណនី"
                  )}
                </motion.button>
              </form>

              {/* Google Signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4 font-suwannaphum">ឬចុះឈ្មោះជាមួយ</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signup_with"
                  width="300"
                  aria-label="ចុះឈ្មោះជាមួយ Google"
                />
              </div>

              <div className="mt-6 text-center text-sm text-gray-600 font-suwannaphum">
                មានគណនីរួចហើយ?{" "}
                <Link
                  to="/login"
                  className="font-medium transition-colors focus:outline-none focus:underline font-suwannaphum"
                  style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                  onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                  onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                >
                  ចូល
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side (Illustration & Benefits) */}
          <div className="hidden md:block md:w-1/2 relative" style={{ background: `linear-gradient(135deg, ${primaryColor}, #0e5c7a)` }}>
            <div className="h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="absolute inset-0 opacity-20">
                <img
                  className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 hover:scale-105"
                  src={person}
                  alt="រូបភាពអប់រំ"
                />
              </div>
              <div></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 text-white pt-40"
              >
                <h3 className="font-bold text-2xl lg:text-3xl font-suwannaphum">ចូលរួមសហគមន៍សិក្សារបស់យើង</h3>
                <p className="text-white/90 mt-2 lg:text-lg font-suwannaphum">ដោះសោរចលនាអន្តរកម្ម វគ្គសិក្សា និងអ្វីៗជាច្រើនទៀត</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "ចូលប្រើចលនាអប់រំថ្នាក់ខ្ពស់",
                    "បទពិសោធន៍សិក្សា",
                    "តាមដានវឌ្ឍនភាព និងទទួលវិញ្ញាបនបត្រ",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-white text-sm lg:text-base font-suwannaphum"
                    >
                      <svg className="w-5 h-5 mr-3" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <p className="mt-1 font-suwannaphum">
          <Link
            to="/privacy"
            className="underline transition-colors focus:outline-none focus:underline font-suwannaphum"
            style={{ color: "#6b7280", hoverColor: primaryColor }}
            onMouseEnter={(e) => (e.target.style.color = primaryColor)}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            គោលការណ៍ឯកជនភាព
          </Link>
          {" • "}
          <Link
            to="/terms"
            className="underline transition-colors focus:outline-none focus:underline font-suwannaphum"
            style={{ color: "#6b7280", hoverColor: primaryColor }}
            onMouseEnter={(e) => (e.target.style.color = primaryColor)}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            លក្ខខណ្ឌនៃសេវាកម្ម
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default SignUpPage;