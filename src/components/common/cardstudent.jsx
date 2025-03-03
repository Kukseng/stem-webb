import React, { useEffect, useState } from "react";
import iconStudy from "../../assets/iconsvg/iconStudy.svg";

import { Sparkles } from "lucide-react";

const StemEducationHeader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  
  const IconStudy = () => (
    <img src={iconStudy} className="w-12 h-12 text-white" />
  );
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full py-4">
      <div className="max-w-content  mx-auto px-4">
        <div className="flex justify-center items-center">
          <div 
            className={`bg-gradient-to-r from-blue-500 to-teal-100 p-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            {/* Left Section: Logo and Title */}
            <div className={`flex items-center space-x-4 transition-all duration-500 delay-100 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-negative-10 opacity-0'}`}>
              {/* Graduation Cap Icon/Logo with animation */}
              <div className="relative w-16 h-16 group">
                <div className="absolute w-full h-full bg-black rounded-full top-1 left-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center bg-blue-600 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                  <IconStudy />
                </div>
              </div>
              
             
              <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-800 transition-colors duration-300">
                គោលបំណងមុខវិជ្ជា STEM
              </h1>
            </div>
            
            {/* Right Section: Buttons with animations */}
            <div className={`flex space-x-4 transition-all duration-500 delay-200 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <button 
                className="px-6 py-2 border-2 border-blue-400 text-blue-700 rounded-full bg-transparent hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
              >
                ខ្មែរ/អង់គ្លេស
              </button>
              <button 
                className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10">ក្លាយជាគ្រូបង្រៀន</span>
                <span className="absolute inset-0 bg-teal-500 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100 z-0"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemEducationHeader;
