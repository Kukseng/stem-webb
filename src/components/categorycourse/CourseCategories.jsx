import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiMath } from "react-icons/bi";
import { MdScience } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { FcEngineering } from "react-icons/fc";

const CourseCategories = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      delay: 50,
      easing: "ease-out",
    });
  }, []);

  const categories = [
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-700",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: <BiMath className="w-8 h-8" />,
      subcategories: [
        { name: "Algebra", href: "/math/algebra" },
        { name: "Calculus", href: "/math/calculus" },
        { name: "Geometry", href: "/math/geometry" },
        { name: "Statistics", href: "/math/statistics" },
      ],
    },
    {
      title: "វិទ្យាសាស្ត្រ",
      enTitle: "Science",
      courses: "987",
      color: "from-teal-500 to-teal-700",
      textColor: "text-teal-600",
      bgLight: "bg-teal-50",
      description: "រៀនអំពីជីវវិទ្យា រូបវិទ្យា និងគីមីវិទ្យា",
      features: ["Biology", "Physics", "Chemistry"],
      icon: <MdScience className="w-8 h-8" />,
      subcategories: [
        { name: "Biology", href: "/science/biology" },
        { name: "Physics", href: "/science/physics" },
        { name: "Chemistry", href: "/science/chemistry" },
      ],
    },
    {
      title: "បច្ចេកវិទ្យា",
      enTitle: "Technology",
      courses: "765",
      color: "from-indigo-500 to-indigo-700",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
      description: "រៀនអំពីកម្មវិធីកុំព្យូទ័រ និងវិស្វកម្ម",
      features: ["Programming", "AI", "Robotics"],
      icon: <GrTechnology className="w-8 h-8" />,
      subcategories: [
        { name: "Programming", href: "/tech/programming" },
        { name: "AI", href: "/tech/ai" },
        { name: "Robotics", href: "/tech/robotics" },
      ],
    },
    {
      title: "វិស្វកម្ម",
      enTitle: "Engineering",
      courses: "543",
      color: "from-cyan-500 to-cyan-700",
      textColor: "text-cyan-600",
      bgLight: "bg-cyan-50",
      description: "រៀនអំពីវិស្វកម្មអេឡិចត្រូនិច និងមេកានិច",
      features: ["Electrical", "Mechanical", "Civil"],
      icon: <FcEngineering className="w-8 h-8" />,
      subcategories: [
        { name: "Electrical", href: "/engineering/electrical" },
        { name: "Mechanical", href: "/engineering/mechanical" },
        { name: "Civil", href: "/engineering/civil" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ជ្រើសយកវគ្គសិក្សាដែលអ្នក{" "}
            <span className="text-yellow-500">ចាប់អារម្មណ៍</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            មុខវិជ្ជាពេញនិយមដែលត្រូវបានជ្រើសរើសដោយអ្នកសិក្សារាប់លាននាក់
          </p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-80"
            >
              {/* Card Base */}
              <div className={`relative p-6 ${category.bgLight} h-full transition-colors duration-300 group-hover:bg-opacity-75`}>
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-3 rounded-full ${category.textColor} bg-white shadow-md group-hover:bg-opacity-90 transition-all duration-300`}
                  >
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium bg-white/80 px-3 py-1 rounded-full text-gray-700 group-hover:text-white group-hover:bg-white/20 transition-all duration-300">
                    {category.courses} វគ្គសិក្សា
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {category.enTitle}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                  {category.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-6 flex flex-col justify-between z-10`}
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {category.title} ({category.enTitle})
                  </h3>
                  <p className="text-sm text-white/90 mb-4">{category.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory, idx) => (
                    <a
                      key={idx}
                      href={subcategory.href}
                      className="text-xs px-3 py-1 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                    >
                      {subcategory.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;