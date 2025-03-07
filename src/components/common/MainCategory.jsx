import React from "react";

const MainCategory = () => {
  return (
    <div className="w-full bg-cyan-900  py-5 mt-10 font-suwannaphum">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between text-white text-sm px-4">
        {/* Trustpilot Rating */}
        <div className="flex items-center space-x-1">
          <span>វាយតម្លៃល្អឥតខ្ចោះ</span>
          <span className="flex text-[#00B67A]">★★★★★</span>
          <span></span>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          {/* Learners */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm9 17v-2a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v2h2v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2h2z"/>
            </svg>
            <span>45 លាននាក់ + អ្នកសិក្សា</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
            <span>10 លាននាក់ + និស្សិតបញ្ចប់ការសិក្សា</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>កម្ពុជា</span>
          </div>
        </div>
      </div>
      <div className="relative">
    
    </div>
    </div>
    
  );
};

export default MainCategory;
