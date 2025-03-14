import React from "react";
import ISTAD from "../../assets/images/logo/ISTAD.png";
import logo from "../../assets/images/logo/o-removebg-preview.png";

const Footer = () => {
  const menuItems = ["ទំព័រដើម", "អំពីស្ថាប័ន", "សេវាកម្ម", "តម្លៃ", "ទំនាក់ទំនង", "ប្លុក"];

  return (
    <footer className="relative w-full mx-auto overflow-hidden bg-footer bg-opacity-30 backdrop-blur-md">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-teal-50/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-teal-50/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* STEM Club Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="Logo-ISTEM" className="h-20 w-20 object-cover object-center" />
              <h2 className="text-xl md:text-2xl font-bold text-primary font-popins">ISTEM</h2>
            </div>
            <p className="text-sm md:text-lg text-gray-600 text-center sm:text-left max-w-sm leading-relaxed">
              យើងមានបំណងផ្តល់ការអប់រំកម្រិតខ្ពស់
              ការផ្តល់មូលដ្ឋានគ្រឹះមានគុណភាពខ្ពស់សម្រាប់សិស្សក្នុងការសិក្សាត្រឹមត្រូវ។
            </p>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">មាតិកា</h3>
            <ul className="space-y-3 text-center sm:text-left">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="text-sm md:text-base text-gray-600 hover:text-teal-600 cursor-pointer transition-all duration-200 hover:translate-x-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">ព័ត៌មានទំនាក់ទំនង</h3>
            <div className="space-y-4 w-full max-w-sm">
              <div className="flex items-center gap-3 justify-center sm:justify-start group cursor-pointer">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-all duration-200">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-gray-600 group-hover:text-green-600 transition-colors duration-200">
                  stem.istad@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start group cursor-pointer">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-all duration-200">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-gray-600 group-hover:text-green-600 transition-colors duration-200">
                  សង្កាត់ទឹកថ្លា ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
                </span>
              </div>
            </div>
          </div>

          {/* ISTAD Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">រៀបចំដោយ</h3>
            <div className="group cursor-pointer">
              <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg">
                <img
                  src={ISTAD}
                  alt="ISTAD Logo"
                  className="w-16 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-xl md:text-2xl text-blue-700 font-bold group-hover:text-blue-600">
                  ISTAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm md:text-base text-gray-600">
            © {new Date().getFullYear()} STEM Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
