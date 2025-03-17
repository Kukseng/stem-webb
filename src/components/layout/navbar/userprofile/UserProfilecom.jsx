import React, { useState, useEffect, useContext } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../../api/auth-api";
import { User, Camera, MapPin, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CreateCourseForm from "../../../coursees/form/CreateCourse";
import DeleteCourseForm from "../../../coursees/form/DeleteCourseForm"; // Ensure correct import
import { Settings, BookOpen, Delete } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetProfileQuery();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  console.log("AuthContext User:", user); // Debug user object
  console.log("Access Token:", user?.accessToken); // Debug accessToken

  const sidebarItems = [
    {
      icon: <Settings size={20} />,
      text: "ការគ្រប់គ្រង",
      component: <UserInfo />,
    },
    {
      icon: <BookOpen size={20} />,
      text: "បង្គើតសិក្សា",
      component: <CreateCourseForm accessToken={user?.accessToken} />,
    },
    {
      icon: <Delete size={20} />,
      text: "លុបវគ្គសិក្សា",
      component: <DeleteCourseForm />, // Directly use DeleteCourseForm
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-[#16789e] rounded-full"
        />
      </div>
    );
  }
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        កំហុខ: {error.message}
      </div>
    );

  return (
    <div className="font-suwannaphum min-h-screen bg-gray-100 pt-[64px] md:pt-0">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Mobile Sidebar Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 left-4 z-50 md:hidden bg-[#16789e] text-white p-2 rounded-full shadow-lg"
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
      </motion.button>

      <div className="max-w-[1300px] mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar (Mobile: Slide-in, Desktop: Fixed) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] bg-white rounded-r-xl shadow-lg p-4 z-50 md:static md:top-0 md:w-64 md:h-fit md:rounded-xl md:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">ម៉ឺនុយ</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-600 hover:text-[#16789e]"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <div className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveSection(index);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      activeSection === index
                        ? "bg-[#16789e] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                    <FaChevronRight
                      className={`transition-transform ${
                        activeSection === index ? "rotate-90" : ""
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          />
        )}

        {/* Sidebar (Desktop: Always Visible) */}
        <motion.aside
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-64 bg-white rounded-xl shadow-lg p-4 flex-shrink-0 h-fit sticky top-6"
        >
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                  activeSection === index
                    ? "bg-[#16789e] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
                <FaChevronRight
                  className={`transition-transform ${
                    activeSection === index ? "rotate-90" : ""
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full"
        >
          {sidebarItems[activeSection].component}
        </motion.main>
      </div>
    </div>
  );
}

const UserInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    image: "",
    dob: null,
  });
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        address: profile.address || "",
        image: profile.image || "",
        dob: profile.dob || null,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      toast.error("សូមបញ្ចូលឈ្មោះអ្នកប្រើ!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      await updateProfile(formData).unwrap();
      toast.success("បានធ្វើបច្ចុប្បន្នភាពទម្រង់ដោយជោគជ័យ!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(
        "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាព: " +
          (err.data?.detail || "កំហុសមិនស្គាល់"),
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">កំពុងផ្ទុក...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        កំហុស: {error.data?.detail}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-[#16789e]/10 to-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-[#16789e]/20">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-[#16789e]/50 rounded-full flex items-center justify-center transition-opacity duration-300"
            >
              <Camera className="text-white" size={24} />
            </motion.div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {formData.first_name} {formData.last_name}
            </h2>
            <p className="text-gray-600 text-sm">សិស្ស</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-2">
              <MapPin size={16} />
              <p>{formData.address || "មិនបានបញ្ជាក់"}</p>
            </div>
          </div>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#16789e] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#0e5a75] transition-colors text-sm sm:text-base"
          >
            ប្ដូររូបថត
          </motion.button> */}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          ព័ត៌មានផ្ទាល់ខ្លួន
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="ឈ្មោះអ្នកប្រើ"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="eg. phengsmos"
            />
            <InputField
              label="ឈ្មោះដំបូង"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="eg. Pheng"
            />
            <InputField
              label="នាមត្រកូល"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="eg. Smos"
            />
            <InputField
              label="អ៊ីមែល"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. user@example.com"
              disabled
            />
          </div>
          <InputField
            label="អាសយដ្ឋាន"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="eg. Nvkhermtah"
          />
          <InputField
            label="រូបភាព (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="បញ្ចូល URL រូបភាព"
          />
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isUpdating}
              className={`flex-1 bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a75] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save size={16} /> រក្សាទុក
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <X size={16} /> ត្រឡប់
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <motion.input
      whileFocus={{ scale: 1.01, borderColor: "#16789e" }}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all text-sm ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

const TimeReportsContent = () => (
  <div className="p-4 sm:p-6 text-gray-600">
    <DeleteCourseForm />
  </div>
);

export default UserProfile;

// ... UserInfo and InputField components remain the same ...
