import React from "react";
import { ChevronDown } from "lucide-react";
import image from "../../assets/markup-cropped.svg"; // Import the SVG

const Banner = () => {
  return (
    <div className="relative overflow-hidden ">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-10">
        <div className="grid grid-cols-2 items-center mt-5">
          {/* Left Content - Text Section */}
          <div className="w-full flex justify-start">
            <div className="text-left ml-0 font-suwannaphum">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-primary  mb-[26px] leading-tight ">
                ISTEM
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-[26px] leading-tight">
                បន្តិចទៀតនឹងក្លាយជាសេសក្រាប់អ្នក
                <br />
                ជើនការក្រុមទិន្នន័យ ក្រុមពេលវេលា
              </h2>
              <p className="text-gray-700  text-base md:text-lg mb-[26px] leading-8">
              អ្នកអាចស្វែងយល់អំពីវិស័យ STEM (វិទ្យាសាស្ត្រ, បច្ចេកវិទ្យា, វិស្វកម្ម, និងគណិតវិទ្យា) តាមរយៈមេរៀនអន្តរកម្ម, វីដេអូបង្រៀន, លំហាត់អនុវត្ត, និងការណែនាំជាចុងដៃពីគ្រូបង្រៀនជំនាញ។ មិនថាអ្នកកំពុងសិក្សា នៅសាលារៀន, សាកលវិទ្យាល័យ, ឬក៏ចង់បង្កើនចំណេះដឹងផ្ទាល់ខ្លួន ISTEM ផ្តល់នូវប្រភពសិក្សាដែលអាចប្រើប្រាស់បានគ្រប់ទីកន្លែងគ្រប់ពេលវេលា។ ដោយមានប្រព័ន្ធបង្រៀនប្រកបដោយអន្តរកម្ម និងការគាំទ្រដោយសហគមន៍អ្នករៀន ISTEM ជួយឲ្យអ្នកអាចបង្កើនជំនាញ និងឆ្ពោះទៅរកអនាគតវិជ្ជាជីវៈរបស់អ្នក។
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                <span>ចាប់ផ្តើមឥឡូវ</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Content - SVG Image Section */}
          <div className="w-full h- flex justify-end">
            <img
              src={image}
              alt="Illustration"
              className="ml-9 w-auto h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
