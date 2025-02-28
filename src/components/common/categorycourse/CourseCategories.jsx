import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "គណិតវិទ្យា",
      enTitle: "Mathematics",
      courses: "1,211",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      description: "រៀនគណិតវិទ្យាជាមួយគ្រូជំនាញ និងមានបទពិសោធន៍",
      features: ["Algebra", "Calculus", "Geometry", "Statistics"],
      duration: "4-6 months",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10h-6m-2-5h10M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    // ... other categories with similar structure
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ជ្រើសយកវគ្គសិក្សាដែលអ្នកចាប់អារម្មណ៍
          </h2>
          <p className="text-gray-600 text-lg">
            Choose from our wide range of courses to enhance your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-64"
            >
              {/* Regular View */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`relative p-6 ${category.bgLight} h-full transition-colors duration-300 group-hover:bg-opacity-0`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.bgLight} ${category.textColor} group-hover:text-white transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors duration-300">
                    {category.courses} វគ្គសិក្សា
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  {category.enTitle}
                </p>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title} ({category.enTitle})
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{category.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm">
                      <span className="font-medium">រយៈពេល:</span> {category.duration}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.features?.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group/btn">
                  <span>ចូលមើលលម្អិត</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;