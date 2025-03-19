import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/services/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
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

  const primaryColor = "#16789e"; // ISTEM Blue
  const accentColor = "#faca15"; // ISTEM Yellow

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError("សូមបំពេញគ្រប់ប្រអប់ទាំងអស់");
      return;
    }
    setLoginError("");
    const loginData = { email: formData.email, password: formData.password };
    console.log("ការព្យាយាមចូលដោយដៃ:", loginData);

    try {
      const response = await login(loginData).unwrap();
      console.log("ការឆ្លើយតបនៃការចូល:", response);
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
        setLoginError("ទម្រង់ការឆ្លើយតបពីសេវ៉ាមិនត្រឹមត្រូវ។ ខ្វះសញ្ញាសម្ងាត់។");
      }
    } catch (err) {
      console.error("កំហុសក្នុងការចូល:", err);
      setLoginError(err.data?.detail || "ការចូលបរាជ័យ។ សូមពិនិត្យមើលព័ត៌មានរបស់អ្នក។");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("ការឆ្លើយតបនៃ Google:", credentialResponse);
    try {
      const idToken = credentialResponse.credential;
      const googleUser = jwtDecode(idToken);
      console.log("អ្នកប្រើ Google ដែលបានឌីកូដ:", googleUser);

      const email = googleUser.email;
      const name = googleUser.name || "អ្នកប្រើ Google";
      const tempPassword = `Google_${googleUser.sub}_${Date.now()}`;

      try {
        const loginResponse = await login({ email, password: tempPassword }).unwrap();
        console.log("ការឆ្លើយតបនៃការចូល Google:", loginResponse);
        if (loginResponse.access && loginResponse.refresh) {
          const userData = { username: loginResponse.username || email.split("@")[0] };
          localStorage.setItem("access_token", loginResponse.access);
          localStorage.setItem("refresh_token", loginResponse.refresh);
          dispatch(setCredentials({ access: loginResponse.access, refresh: loginResponse.refresh, username: userData.username }));
          navigate("/");
        }
      } catch (loginErr) {
        console.error("កំហុសក្នុងការចូល Google:", loginErr);
        if (loginErr.status === 401 || loginErr.status === 400) {
          const registerData = {
            first_name: name.split(" ")[0] || "មិនស្គាល់",
            last_name: name.split(" ").slice(1).join(" ") || "អ្នកប្រើ",
            username: email.split("@")[0] + Math.floor(Math.random() * 1000),
            email,
            password: tempPassword,
            ConfirmPassword: tempPassword,
          };
          try {
            const registerResponse = await register(registerData).unwrap();
            console.log("ការឆ្លើយតបនៃការចុះឈ្មោះ Google:", registerResponse);
            setLoginError("គណនីត្រូវបានបង្កើតជោគជ័យ! សូមផ្ទៀងផ្ទាត់ OTP របស់អ្នក។");
            setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
          } catch (registerErr) {
            console.error("កំហុសក្នុងការចុះឈ្មោះ Google:", registerErr);
            setLoginError(registerErr.data?.detail || "ការចុះឈ្មោះជាមួយ Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត។");
          }
        } else {
          setLoginError(loginErr.data?.detail || "ការចូលជាមួយ Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត។");
        }
      }
    } catch (err) {
      console.error("កំហុសក្នុងការចូល Google:", err);
      setLoginError("បរាជ័យក្នុងការដំណើរការ Google Login។ សូមព្យាយាមម្តងទៀត។");
    }
  };

  const handleGoogleError = () => {
    console.error("ការចូល Google បរាជ័យ - បញ្ហាបង្អួច ឬការកំណត់");
    setLoginError("ការចូល Google បរាជ័យ។ សូមព្យាយាមម្តងទៀត ឬប្រើការចូលដោយដៃ។");
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
          {/* Login Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="font-bold text-2xl sm:text-3xl font-suwannaphum" style={{ color: primaryColor }}>
                សូមស្វាគមន៍ត្រឡប់មកវិញ
              </h2>
              <p className="text-sm mt-2 text-gray-600 font-suwannaphum">ចូលដើម្បីបន្តដំណើរសិក្សារបស់អ្នក</p>

              {/* Error Message */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start justify-between shadow-sm"
                >
                  <div className="flex items-start">
                    <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-suwannaphum">{loginError}</span>
                  </div>
                  <button
                    onClick={() => setLoginError("")}
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
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5 font-suwannaphum">
                    អ៊ីមែល
                  </label>
                  <input
                    id="email"
                    className="p-3 rounded-lg border border-gray-300 w-full focus:border-[2px] focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md font-suwannaphum placeholder-gray-400"
                    style={{
                      borderColor: loginError.includes("email") ? "#ef4444" : "#d1d5db",
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
                        borderColor: loginError.includes("credentials") ? "#ef4444" : "#d1d5db",
                        focusBorderColor: primaryColor,
                        focusRingColor: primaryColor,
                      }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
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
                      aria-label="ចងចាំខ្ញុំ"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-suwannaphum">
                      ចងចាំខ្ញុំ
                    </label>
                  </div>
                  {/* <Link
                    to="/forgot-password"
                    className="text-sm font-medium transition-colors focus:outline-none focus:underline font-suwannaphum"
                    style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                    onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                    onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                  >
                    ភ្លេចពាក្យសម្ងាត់?
                  </Link> */}
                </div>

                <motion.button
                  type="submit"
                  className="mt-2 rounded-full text-white py-3 font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg font-suwannaphum"
                  style={{ backgroundColor: primaryColor }}
                  whileHover={{ scale: isLoginLoading ? 1 : 1.05, backgroundColor: isLoginLoading ? primaryColor : "#0e5c7a" }}
                  whileTap={{ scale: isLoginLoading ? 1 : 0.95 }}
                  disabled={isLoginLoading}
                  aria-label="ចូល"
                >
                  {isLoginLoading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin mr-2 h-4 w-4 text-white" />
                      កំពុងចូល...
                    </span>
                  ) : (
                    "ចូល"
                  )}
                </motion.button>
              </form>

              {/* Google Login */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4 font-suwannaphum">ឬចូលជាមួយ</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signin_with"
                  width="300"
                  aria-label="ចូលជាមួយ Google"
                />
              </div>

              <div className="mt-6 text-center text-sm text-gray-600 font-suwannaphum">
                មិនមានគណនីទេ?{" "}
                <Link
                  to="/signup"
                  className="font-medium transition-colors focus:outline-none focus:underline font-suwannaphum"
                  style={{ color: primaryColor, hoverColor: "#0e5c7a" }}
                  onMouseEnter={(e) => (e.target.style.color = "#0e5c7a")}
                  onMouseLeave={(e) => (e.target.style.color = primaryColor)}
                >
                  បង្កើតគណនី
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
                <h3 className="font-bold text-2xl lg:text-3xl font-suwannaphum">សូមស្វាគមន៍ត្រឡប់មកវិញ!</h3>
                <p className="text-white/90 mt-2 lg:text-lg font-suwannaphum">បន្តដំណើរសិក្សារបស់អ្នកជាមួយ ISTEM</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "ចូលប្រើវគ្គសិក្សាផ្ទាល់ខ្លួនរបស់អ្នក",
                    "បន្តការសិក្សារបស់អ្នក",
                    "តាមដានវឌ្ឍនភាពរបស់អ្នក",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-white text-sm lg:text-base font-suwannaphum"
                    >
                      <svg className="w-5 h-5 mr-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
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

export default LoginPage;