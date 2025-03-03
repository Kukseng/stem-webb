import React, { useState } from "react";
import {
  MdVideocam,
  MdOutlineCode,
  MdOutlineNotes,
  MdPayment,
} from "react-icons/md";
import {
  FaPaintBrush,
  FaChartLine,
  FaMoneyBillWave,
  FaNetworkWired,
} from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";

const CoursePlatform = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      icon: <MdVideocam size={24} />,
      title: "Video Editing",
      articlesCount: 38,
      description: "Learn video editing skills using modern tools.",
    },
    {
      id: 2,
      icon: <FaPaintBrush size={24} />,
      title: "Art & Design",
      articlesCount: 25,
      description: "Explore creativity through digital and traditional art.",
    },
    {
      id: 3,
      icon: <MdOutlineCode size={24} />,
      title: "Programming",
      articlesCount: 50,
      description: "Master coding from basics to advanced levels.",
    },
    {
      id: 4,
      icon: <TbSoccerField size={24} />,
      title: "Sports Science",
      articlesCount: 15,
      description: "Understand the science behind athletic performance.",
    },
    {
      id: 5,
      icon: <MdOutlineNotes size={24} />,
      title: "Writing",
      articlesCount: 30,
      description: "Improve your writing and storytelling skills.",
    },
    {
      id: 6,
      icon: <FaChartLine size={24} />,
      title: "Business Analytics",
      articlesCount: 20,
      description: "Analyze business data for strategic insights.",
    },
    {
      id: 7,
      icon: <MdPayment size={24} />,
      title: "Finance & Investment",
      articlesCount: 18,
      description: "Learn financial planning and investment strategies.",
    },
    {
      id: 8,
      icon: <FaMoneyBillWave size={24} />,
      title: "Economics",
      articlesCount: 12,
      description: "Understand economic principles and market trends.",
    },
    {
      id: 9,
      icon: <FaNetworkWired size={24} />,
      title: "Networking",
      articlesCount: 22,
      description: "Build and secure computer networks.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Course Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Icon */}
            <div className="flex justify-center items-center mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
              {category.icon}
            </div>

            {/* Title and Article Count */}
            <p className="text-gray-800 font-medium text-center text-lg mb-1">
              {category.title}
            </p>
            <p className="text-gray-600 text-sm text-center">
              {category.articlesCount} articles
            </p>

            {/* Hover Detail Card */}
            {hoveredCategory?.id === category.id && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-10 transition-opacity duration-300"
                style={{ opacity: hoveredCategory ? 1 : 0 }}
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlatform;