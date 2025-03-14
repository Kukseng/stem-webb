import React, { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../api/auth-api";
import { User, Camera, MapPin, X, Save, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CreateCourseForm from "../CreateCourse"; 
import { Settings, BookOpen, Clock, FileText } from "lucide-react";
const UserProfile = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { data, isLoading, isError, error } = useGetProfileQuery();
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <Settings size={20} />, text: "ការគ្រប់គ្រង", component: <UserInfo /> },
    { icon: <BookOpen size={20} />, text: "បង្គើតសិក្សា", component: <CreateCourseForm /> },
    { icon: <Clock size={20} />, text: "របាយការណ៍ម៉ោង", component: <TimeReportsContent /> },
    { icon: <FileText size={20} />, text: "របាយការណ៍សំណួរ", component: <QuestionReportsContent /> },
  ];

  if (isLoading) return <div className="text-center py-10 text-gray-600">កំពុងផ្ទុក...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">កំហុស: {error.message}</div>;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="font-suwannaphum min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-[#16789e] hover:text-[#0e5a75] flex items-center gap-2 transition-colors"
          >
            <FaChevronRight className="rotate-180" size={16} /> ទំព័រដើម
          </button>
          <h1 className="text-xl font-bold text-gray-800">ផ្ទាំងគ្រប់គ្រង</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium hidden sm:block">
            {data?.first_name} {data?.last_name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a75] flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} /> ចាកចេញ
          </button>
        </div>
      </header>

      <div className="max-w-[1300px] mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">

        <aside className="w-full md:w-64 bg-white rounded-xl shadow-md p-4 flex-shrink-0">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  activeSection === index
                    ? "bg-[#16789e] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
                <FaChevronRight
                  className={`transition-transform duration-300 ${
                    activeSection === index ? "rotate-90" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-xl shadow-md p-6">
          {sidebarItems[activeSection].component}
        </main>
      </div>
    </div>
  );
};

const UserInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
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
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
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
    try {
      await updateProfile(formData).unwrap();
      alert("បានធ្វើបច្ចុប្បន្នភាពទម្រង់ដោយជោគជ័យ!");
    } catch (err) {
      alert("បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាព: " + (err.data?.detail || "កំហុសមិនស្គាល់"));
    }
  };

  if (isLoading) return <div className="text-center py-10 text-gray-600">កំពុងផ្ទុក...</div>;
  if (error) return <div className="text-center py-10 text-red-500">កំហុស: {error.data?.detail}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
            <div
              className={`absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {formData.first_name} {formData.last_name}
            </h2>
            <p className="text-gray-600 text-sm">សិស្ស</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-2">
              <MapPin size={16} />
              <p>{formData.address || "មិនបានបញ្ជាក់"}</p>
            </div>
          </div>
          <button className="bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a75] transition-colors">
            ប្ដូររូបថត
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ព័ត៌មានផ្ទាល់ខ្លួន</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះដំបូង</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="eg. Pheng"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">នាមត្រកូល</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="eg. Smos"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-colors text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. user@example.com"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-colors text-sm"
              disabled // Email typically not editable
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">អាសយដ្ឋាន</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="eg. Nvkhermtah"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">រូបភាព (URL)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="បញ្ចូល URL រូបភាព"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-colors text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className={`flex-1 bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a75] transition-colors flex items-center justify-center gap-2 ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save size={16} /> រក្សាទុក
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X size={16} /> ត្រឡប់
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Placeholder components (unchanged for brevity)
const TimeReportsContent = () => <div className="p-6 text-gray-600">របាយការណ៍ម៉ោង</div>;
const QuestionReportsContent = () => <div className="p-6 text-gray-600">របាយការណ៍សំណួរ</div>;

export default UserProfile;