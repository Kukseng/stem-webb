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
      color: "from-primary to-blue-600",
      textColor: "text-primary",
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
      color: "from-primary to-teal-500",
      textColor: "text-primary",
      bgLight: "bg-teal-50",
      description: "រៀនអំពីជីវវិទ្យា រូបវិទ្យា និងគីមីវិទ្យា",
      features: ["Biology", "Physics", "Chemistry"],
      duration: "3-5 months",
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
      color: "from-primary to-indigo-500",
      textColor: "text-primary",
      bgLight: "bg-indigo-50",
      description: "រៀនអំពីកម្មវិធីកុំព្យូទ័រ និងវិស្វកម្ម",
      features: ["Programming", "AI", "Robotics"],
      duration: "4-6 months",
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
      color: "from-primary to-cyan-500",
      textColor: "text-primary",
      bgLight: "bg-cyan-50",
      description: "រៀនអំពីវិស្វកម្មអេឡិចត្រូនិច និងមេកានិច",
      features: ["Electrical", "Mechanical", "Civil"],
      duration: "5-7 months",
      icon: <FcEngineering className="w-8 h-8" />,
      subcategories: [
        { name: "Electrical", href: "/engineering/electrical" },
        { name: "Mechanical", href: "/engineering/mechanical" },
        { name: "Civil", href: "/engineering/civil" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-[100px]">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ជ្រើសយកវគ្គសិក្សាដែលអ្នកចាប់អារម្មណ៍
          </h2>
          <p className="text-gray-600 text-lg">
            មុខវិជ្ជាពេញនិយម
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-72"
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
                  <path d="M0,0 L100,0 L100,100 L0,100 Z" />
                </svg>
              </div>

    
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
              />
              
              {/* Card content */}
              <div className={`relative p-6 ${category.bgLight} h-full transition-colors duration-500 group-hover:bg-opacity-0`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.bgLight} ${category.textColor} group-hover:text-white transition-colors duration-500 shadow-md`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full text-primary group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
                    {category.courses} វគ្គសិក្សា
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-500">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-white/90 transition-colors duration-500">
                  {category.enTitle}
                </p>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-primary rounded w-3/4"></div>
                  </div>
                </div>
              </div>

           
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-6 flex flex-col justify-between z-10"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title} ({category.enTitle})
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{category.description}</p>

                  <div className="space-y-2">
                    <p className="text-white/90 text-sm">
                      <span className="font-medium">រយៈពេល:</span> {category.duration}
                    </p>
                  </div>
                </div>

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