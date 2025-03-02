import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiMath } from "react-icons/bi";

const CourseCategories = () => {  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      delay: 50,
      easing: "ease-out",
    });
  }, []);


  const categories = [
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-[#16789e] to-blue-600",
      textColor: "text-[#16789e]",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
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
      color: "from-[#16789e] to-teal-500",
      textColor: "text-[#16789e]",
      bgLight: "bg-teal-50",
      description: "រៀនអំពីជីវវិទ្យា រូបវិទ្យា និងគីមីវិទ្យា",
      features: ["Biology", "Physics", "Chemistry"],
      duration: "3-5 months",
      icon: (
       <BiMath className="w-8 h-8" />
      ),
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
      color: "from-[#16789e] to-indigo-500",
      textColor: "text-[#16789e]",
      bgLight: "bg-indigo-50",
      description: "រៀនអំពីកម្មវិធីកុំព្យូទ័រ និងវិស្វកម្ម",
      features: ["Programming", "AI", "Robotics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4M3 17l8-4 8 4M3 12l8 4 8-4" />
        </svg>
      ),
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
      color: "from-[#16789e] to-cyan-500",
      textColor: "text-[#16789e]",
      bgLight: "bg-cyan-50",
      description: "រៀនអំពីវិស្វកម្មអេឡិចត្រូនិច និងមេកានិច",
      features: ["Electrical", "Mechanical", "Civil"],
      duration: "5-7 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      subcategories: [
        { name: "Electrical", href: "/engineering/electrical" },
        { name: "Mechanical", href: "/engineering/mechanical" },
        { name: "Civil", href: "/engineering/civil" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-[100px] ">
      <div className="max-w-content  mx-auto px-4 sm:px-6 lg:px-4">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ជ្រើសយកវគ្គសិក្សាដែលអ្នកចាប់អារម្មណ៍
          </h2>
          <p className="text-gray-600 text-lg">
            មុខវិជ្ជាពេញនិយម
          </p>
          <div className="w-24 h-1 bg-[#16789e] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-72"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#16789e]">
                  <path d="M0,0 L100,0 L100,100 L0,100 Z" />
                </svg>
              </div>

              {/* Regular View */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`relative p-6 ${category.bgLight} h-full transition-colors duration-300 group-hover:bg-opacity-0`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.bgLight} ${category.textColor} group-hover:text-white transition-colors duration-300 shadow-md`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium bg-[#16789e]/10 px-3 py-1 rounded-full text-[#16789e] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                    {category.courses} វគ្គសិក្សា
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {category.enTitle}
                </p>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-[#16789e] rounded w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#16789e]/95 to-[#16789e]/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title} ({category.enTitle})
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{category.description}</p>

                  <div className="space-y-2">
                    <p className="text-white/90 text-sm">
                      <span className="font-medium">រយៈពេល:</span> {category.duration}
                    </p>
                    {/* <div className="flex flex-wrap gap-2 mb-3">
                      {category.features && category.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                          {feature}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </div>

                {/* Subcategories Links */}
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory, idx) => (
                    <a
                      key={idx}
                      href={subcategory.href}
                      className="text-xs px-2 py-1 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-300"
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