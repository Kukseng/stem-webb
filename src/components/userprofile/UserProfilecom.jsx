import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Timer,
  KeyRound,
  EyeOff,
  User,
  Camera,
  Save,
  X,
  BookOpen,
  Clock,
  FileText,
  Settings,
} from "lucide-react";
import { FaBook, FaChevronRight } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux"; // Add this
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../../api/auth-api";
import CreateCourseForm from "../CreateCourse";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { data, isLoading, isError, error } = useGetProfileQuery();
  const { accessToken } = useSelector((state) => state.auth); // Retrieve token

  console.log("UserProfile Access Token:", accessToken); // Debug token

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
    dob: "",
    phone: "",
    location: "",
    about: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        username: data.username || "",
        email: data.email || "",
        address: data.address || "",
        dob: data.dob || "",
        phone: data.phone || "",
      });
    }
  }, [data]);

  const sidebarItems = [
    {
      icon: <Settings size={18} />,
      text: "ការគ្រប់គ្រង",
      component: <ManagementContent />,
    },
    {
      icon: <BookOpen size={18} />,
      text: "បង្គើតសិក្សា",
      component: <CreateCourseForm accessToken={accessToken} />, // Pass token
    },
    {
      icon: <Clock size={18} />,
      text: "របាយការណ៍ម៉ោង",
      component: <TimeReportsContent />,
    },
    {
      icon: <FileText size={18} />,
      text: "របាយការណ៍សំណួរ",
      component: <QuestionReportsContent />,
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="font-suwannaphum w-full bg-gray-50">
      <div className="max-w-[1300px] mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 transition-all duration-300 hover:shadow-md">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`text-gray-700 mb-4 transition-all duration-300 cursor-pointer
                    ${
                      activeSection === index
                        ? "bg-blue-50 rounded-lg text-[#16789E]"
                        : "hover:bg-gray-50 rounded-lg"
                    }`}
                  onMouseEnter={() => setActiveSection(index)}
                  onClick={() => setActiveSection(index)}
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      {item.icon} {item.text}
                    </div>
                    <FaChevronRight
                      className={`transition-transform duration-300 ${
                        activeSection === index
                          ? "rotate-90 text-[#16789E]"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors duration-200">
              បោះបង់ <VscSignOut className="ml-auto" />
            </button>
          </div>

          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            {sidebarItems[activeSection].component}
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagementContent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="transition-all duration-500 animate-fadeIn">
      {/* Profile Section */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {/* Profile Image */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User size={40} className="text-gray-400" />
            </div>
            <div
              className={`absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Camera className="text-white" />
            </div>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-xl font-bold">សុវណ្ណរាគី</h1>
            <p className="text-gray-600">សិស្ស</p>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin size={16} />
              <p>ភ្នំពេញ​, ...</p>
            </div>
          </div>

          <div className="md:ml-auto flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <button className="bg-[#16789E] hover:bg-[#0e5a75] text-white px-4 py-2 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
              <Camera size={16} />
              ប្ដូររូបថតថ្មី
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
              លុប
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200 my-6"></div>

        {/* Form Section */}
        <div className="bg-white rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group">
              <label className="block text-gray-700 font-medium mb-2">
                ឈ្មោះដំបូង
              </label>
              <input
                type="text"
                placeholder="eg. Alaa"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#16789E] transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2">
                នាមត្រកូល
              </label>
              <input
                type="text"
                placeholder="eg. Mohamed"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#16789E] transition-all duration-200"
              />
            </div>
          </div>

          <div className="mb-6 group">
            <label className="block text-gray-700 font-medium mb-2">
              ពាក្យសម្ងាត់
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#16789E] transition-colors duration-200"
                size={18}
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="********"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#16789E] transition-all duration-200"
              />
              <button
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {isPasswordVisible ? (
                  <EyeOff size={18} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
            <X size={16} />
            បោះបង់
          </button>
          <button className="bg-[#16789E] hover:bg-[#0e5a75] text-white px-5 py-2 rounded-full transition-all duration-200 flex items-center gap-2">
            <Save size={16} />
            រក្សាការផ្លាស់ប្ដូ
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for Video Lessons content
const VideoLessonsContent = () => {
  return (
    <div className="p-6 transition-all duration-500 animate-fadeIn">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="font-bold text-2xl text-gray-800">វីដេអូសិក្សា</h1>
        <div className="h-1 w-20 bg-[#16789E] mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gray-200 w-full h-40 flex items-center justify-center">
              <BookOpen size={40} className="text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                វីដេអូ មេរៀនទី {item}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                វីដេអូ ពន្យល់អំពីមេរៀន...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> ៣០ នាទី
                </span>
                <button className="bg-[#16789E] text-white px-3 py-1 rounded-full text-sm hover:bg-[#0e5a75] transition-colors duration-200">
                  មើល
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimeReportsContent = () => {
  return <div className="p-6 transition-all duration-500 animate-fadeIn"></div>;
};


const QuestionReportsContent = () => {
  return (
    <div className="p-6 transition-all duration-500 animate-fadeIn">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="font-bold text-2xl text-gray-800">របាយការណ៍សំណួរ</h1>
        <div className="h-1 w-20 bg-[#16789E] mt-2 rounded-full"></div>
      </div>

      <div className="space-y-6">
        {[
          {
            id: 1,
            question: "តើលំហាត់គណិតវិទ្យាទី១ បានពិន្ទុប៉ុន្មាន?",
            answer: "៨/១០",
            date: "០១/០៣/២០២៥",
            status: "ឆ្លើយហើយ",
          },
          {
            id: 2,
            question: "ពន្យល់អំពីដំណោះស្រាយលំហាត់ទី៣",
            answer: "សំណួរនេះមិនទាន់ត្រូវបានឆ្លើយតប",
            date: "០២/០៣/២០២៥",
            status: "រង់ចាំ",
          },
          {
            id: 3,
            question: "តើមេរៀនទី៥ មានខ្លឹមសារអ្វីខ្លះ?",
            answer: "មេរៀននេះមានខ្លឹមសារអំពី...",
            date: "០៣/០៣/២០២៥",
            status: "ឆ្លើយហើយ",
          },
        ].map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium">សំណួរលេខ {item.id}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.status === "ឆ្លើយហើយ"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="p-4">
              <p className="mb-4 font-semibold">{item.question}</p>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                {item.answer}
              </div>
              <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                <span>កាលបរិច្ឆេទ: {item.date}</span>
                <button className="text-[#16789E] hover:underline">
                  មើលលម្អិត
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
