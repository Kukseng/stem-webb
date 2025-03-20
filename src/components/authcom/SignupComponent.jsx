import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/auth-api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import person from "../../assets/person.svg";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { Eye, EyeOff, Loader } from "lucide-react";
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
      errors.password = "ប្រើ ៨ តួអក្សរ មានអក្សរ លេខ និងនិមិត្តសញ្ញា";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "ពាក្យសម្ងាត់មិនត្រូវគ្នា";
    if (!formData.agreeTerms) errors.agreeTerms = "សូមយល់ព្រមលក្ខខណ្ឌ";

    return errors;
  };

  const PasswordFeedback = ({ password }) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@$!%*#?&]/.test(password);

    if (!password || isValid) return null;

    return (
      <div className="text-[10px] sm:text-xs mt-1 font-suwannaphum" aria-live="polite">
        {!hasLength && <p className="text-red-600">✗ ៨ តួអក្សរ</p>}
        {!hasLetter && <p className="text-red-600">✗ មួយអក្សរ</p>}
        {!hasNumber && <p className="text-red-600">✗ មួយលេខ</p>}
        {!hasSymbol && <p className="text-red-600">✗ មួយនិមិត្តសញ្ញា</p>}
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
      console.log("ផ្ញើទិន្នន័យ:", JSON.stringify(registerData, null, 2));
      const response = await register(registerData).unwrap();
      console.log("ឆ្លើយតប:", JSON.stringify(response, null, 2));
      setSuccessMessage("បង្កើតជោគជ័យ! កំពុងប្តូរទៅ OTP...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setTimeout(() => navigate("/verify-otp", { state: { email: formData.email } }), 1500);
    } catch (err) {
      console.error("កំហុស:", JSON.stringify(err, null, 2));
      console.error("ព័ត៌មាន:", JSON.stringify(err.data, null, 2));
      if (err.status === 400 && err.data?.errors?.email?.includes("user with this email address already exists")) {
        setFormErrors({ general: "អ៊ីមែលនេះមានរួចហើយ។ កំពុងប្តូរទៅចូល..." });
        setTimeout(() => navigate("/login", { state: { email: formData.email, message: "សូមចូលជាមួយអ៊ីមែលនេះ។" } }), 1500);
      } else if (err.data?.errors) {
        const fieldErrors = Object.entries(err.data.errors).reduce((acc, [key, value]) => {
          acc[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value;
          return acc;
        }, {});
        setFormErrors(fieldErrors);
      } else {
        setFormErrors({ general: err.data?.message || "បរាជ័យ។ សូមព្យាយាមម្តងទៀត។" });
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google response:", JSON.stringify(credentialResponse, null, 2));
    try {
      const idToken = credentialResponse.credential;
      const decodedToken = jwtDecode(idToken);
      console.log("Decoded token:", JSON.stringify(decodedToken, null, 2));

      const googleEmail = decodedToken.email;
      const googleName = decodedToken.name || "អ្នកប្រើ Google";
      const temporaryPassword = "GoogleUser123@*";

      const registerData = {
        first_name: googleName.split(" ")[0] || "មិនស្គាល់",
        last_name: googleName.split(" ").slice(1).join(" ") || "អ្នកប្រើ",
        username: googleEmail.split("@")[0] + Math.floor(Math.random() * 10000),
        email: googleEmail,
        password: temporaryPassword,
        ConfirmPassword: temporaryPassword,
      };

      console.log("ផ្ញើ Google:", JSON.stringify(registerData, null, 2));
      const response = await register(registerData).unwrap();
      console.log("ឆ្លើយតប Google:", JSON.stringify(response, null, 2));
      setSuccessMessage("បង្កើតជោគជ័យ! កំពុងប្តូរទៅ OTP...");
      setTimeout(() => navigate("/verify-otp", { state: { email: googleEmail } }), 1500);
    } catch (err) {
      console.error("កំហុស Google:", JSON.stringify(err, null, 2));
      console.error("ព័ត៌មាន:", JSON.stringify(err.data, null, 2));
      if (err.status === 400 && err.data?.errors?.email?.includes("user with this email address already exists")) {
        setFormErrors({ general: "អ៊ីមែលនេះមានរួចហើយ។ កំពុងប្តូរទៅចូល..." });
        setTimeout(() => navigate("/login", { state: { email: decodedToken.email, message: "សូមចូលជាមួយ Google ឬពាក្យសម្ងាត់។" } }), 1500);
      } else {
        setFormErrors({ general: err.data?.message || "Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត។" });
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google signup failed");
    setFormErrors({ general: "Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត។" });
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-gray-50 to-yellow-50 min-h-screen flex items-center justify-center p-2 sm:p-4">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-2 sm:p-4 flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src={logomodified}
            alt="ISTEM Logo"
            className="h-8 w-8 sm:h-10 sm:w-10"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <h1 className="text-base sm:text-lg font-bold font-suwannaphum" style={{ color: primaryColor }}>
            ISTEM
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden my-12 sm:my-16"
      >
        {/* SignUp Form */}
        <div className="w-full md:w-1/2 p-4 sm:p-6">
          <div className="w-full">
            <h2 className="font-bold text-lg sm:text-xl font-suwannaphum" style={{ color: primaryColor }}>
              បង្កើតគណនី
            </h2>
            <p className="text-[14px] sm:text-sm text-gray-600 mt-1 font-suwannaphum">ចូលរួមជាមួយយើង</p>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 sm:mt-3 p-2 bg-green-50 border border-green-200 text-green-700 text-[10px] sm:text-xs rounded flex items-center font-suwannaphum"
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </motion.div>
            )}

            {formErrors.general && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 sm:mt-3 p-2 bg-red-50 border border-red-200 text-red-700 text-[10px] sm:text-xs rounded flex items-center font-suwannaphum"
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.general}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div>
                <label htmlFor="username" className="text-[12px] sm:text-sm font-medium text-gray-700 font-suwannaphum">ឈ្មោះអ្នកប្រើ</label>
                <input
                  id="username"
                  className="mt-1 p-2 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none font-suwannaphum placeholder-gray-400 text-[12px] sm:text-sm"
                  style={{ borderColor: formErrors.username ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor, focusRingColor: primaryColor }}
                  type="text"
                  name="username"
                  placeholder="ឈ្មោះអ្នកប្រើ"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
                {formErrors.username && <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-suwannaphum">{formErrors.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-[12px] sm:text-sm font-medium text-gray-700 font-suwannaphum">អ៊ីមែល</label>
                <input
                  id="email"
                  className="mt-1 p-2 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none font-suwannaphum placeholder-gray-400 text-[12px] sm:text-sm"
                  style={{ borderColor: formErrors.email ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor, focusRingColor: primaryColor }}
                  type="email"
                  name="email"
                  placeholder="istem@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                {formErrors.email && <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-suwannaphum">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="text-[12px] sm:text-sm font-medium text-gray-700 font-suwannaphum">ពាក្យសម្ងាត់</label>
                <div className="relative">
                  <input
                    id="password"
                    className="mt-1 p-2 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none font-suwannaphum placeholder-gray-400 text-[12px] sm:text-sm"
                    style={{ borderColor: formErrors.password ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor, focusRingColor: primaryColor }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="៨ តួអក្សរ"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                    aria-label={showPassword ? "លាក់" : "បង្ហាញ"}
                  >
                    {showPassword ? <EyeOff size={14} sm:size={16} color="#6b7280" /> : <Eye size={14} sm:size={16} color="#6b7280" />}
                  </button>
                </div>
                <PasswordFeedback password={formData.password} />
                {formErrors.password && <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-suwannaphum">{formErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-[12px] sm:text-sm font-medium text-gray-700 font-suwannaphum">បញ្ជាក់ពាក្យសម្ងាត់</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    className="mt-1 p-2 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none font-suwannaphum placeholder-gray-400 text-[12px] sm:text-sm"
                    style={{ borderColor: formErrors.confirmPassword ? "#ef4444" : "#d1d5db", focusBorderColor: primaryColor, focusRingColor: primaryColor }}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="បញ្ជាក់"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                    aria-label={showConfirmPassword ? "លាក់" : "បង្ហាញ"}
                  >
                    {showConfirmPassword ? <EyeOff size={14} sm:size={16} color="#6b7280" /> : <Eye size={14} sm:size={16} color="#6b7280" />}
                  </button>
                </div>
                {formErrors.confirmPassword && <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-suwannaphum">{formErrors.confirmPassword}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-3 w-3 sm:h-4 sm:w-4 rounded focus:ring-2 focus:ring-offset-2"
                  style={{ borderColor: formErrors.agreeTerms ? "#ef4444" : "#d1d5db", color: accentColor, focusRingColor: primaryColor }}
                  required
                />
                <label htmlFor="agreeTerms" className="ml-2 text-[14px] sm:text-sm text-gray-600 font-suwannaphum">
                  យល់ព្រម{" "}
                  <Link className="underline" style={{ color: primaryColor }}>លក្ខខណ្ឌ</Link> និង{" "}
                  <Link className="underline" style={{ color: primaryColor }}>ឯកជនភាព</Link>
                </label>
              </div>
              {formErrors.agreeTerms && <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-suwannaphum">{formErrors.agreeTerms}</p>}

              <motion.button
                type="submit"
                className="mt-2 sm:mt-3 rounded-lg text-white py-2 font-medium flex items-center justify-center font-suwannaphum text-[12px] sm:text-sm"
                style={{ backgroundColor: primaryColor }}
                whileHover={{ scale: isLoading ? 1 : 1.05, backgroundColor: isLoading ? primaryColor : "#0e5c7a" }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    កំពុងបង្កើត...
                  </span>
                ) : (
                  "បង្កើតគណនី"
                )}
              </motion.button>
              <div className="mt-3 flex flex-col items-center justify-center">
  {/* Text */}
  <p className="text-xs sm:text-sm text-gray-600 font-suwannaphum mb-2 sm:mb-3">
    ឬប្រើ Google
  </p>
  {/* Google Login Button */}
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={handleGoogleError}
    text="signup_with"
    width="100%" // Responsive width
    shape="pill"
    size="medium"
    className="w-full sm:w-auto"
  />
</div>

              <p className="mt-2 text-[14px] sm:text-sm text-gray-600 text-center font-suwannaphum">
                មានគណនី? <Link to="/login" className="underline" style={{ color: primaryColor }}>ចូល</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Promotional Section */}
        <div
          className="hidden md:block md:w-1/2 p-4 sm:p-6 relative"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, #0e5c7a)` }}
        >
          <div className="text-white relative z-10">
            <h3 className="font-bold text-2xl lg:text-3xl  font-suwannaphum">ចូលរួមសហគមន៍យើង</h3>
            <p className="text-[12px] sm:text-sm lg:text-lg  mt-1 font-suwannaphum">ដោះសោអត្ថប្រយោជន៍ជាច្រើន</p>
            <ul className="mt-2 sm:mt-3 space-y-2 text-[12px] sm:text-sm  lg:text-[20px] font-suwannaphum">
              <li className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ចលនាអប់រំខ្ពស់
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                បទពិសោធន៍សិក្សា
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                រីកចម្រើនចំណេះដឹង
              </li>
            </ul>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <img
              src={person}
              alt="រូបភាព"
              className="max-h-[80%] max-w-[80%] sm:max-h-full sm:max-w-full object-contain"
            />
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      {/* <footer className="absolute bottom-1 sm:bottom-2 text-center text-[10px] sm:text-xs text-gray-500 font-suwannaphum">
        <Link to="/privacy" className="underline" style={{ color: "#6b7280" }}>ឯកជនភាព</Link> •{" "}
        <Link to="/terms" className="underline" style={{ color: "#6b7280" }}>លក្ខខណ្ឌ</Link>
      </footer> */}
    </section>
  );
};

export default SignUpPage;