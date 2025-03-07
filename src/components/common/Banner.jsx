import React from "react";
import { ChevronDown } from "lucide-react";
import image from "../../assets/markup-cropped.svg"; // Import the SVG

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[1300px]  mx-auto px-4 sm:px-6 lg:px-4  py-10 sm:py-16">
      
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="w-full flex justify-start">
            <div className="text-left ml-0 font-suwannaphum">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-4 sm:mb-6 leading-tight animate-fade-in">
                ការសេក្សាវីដេអូបង្រៀនសិក្សាដោយសេរីបច្ចេកវិទ្យាថ្មីៗ
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-descrid  mb-4 sm:mb-6 leading-normal animate-fade-in">
                បទពិសោធន៍សិក្សាដោយសេរីសម្រាប់អ្នក
                <br />
                រៀនបានគ្រប់ទីកន្លែង គ្រប់ពេលវេលា
              </h2>
              <p className="text-descrid  text-sm sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed animate-fade-in">
                អ្នកអាចស្វែងយល់អំពីវិស័យ STEM (វិទ្យាសាស្ត្រ, បច្ចេកវិទ្យា,
                វិស្វកម្ម, និងគណិតវិទ្យា) តាមរយៈមេរៀនអន្តរកម្ម, វីដេអូបង្រៀន,
                លំហាត់អនុវត្ត, និងការណែនាំជាចុងដៃពីគ្រូបង្រៀនជំនាញ។
                មិនថាអ្នកកំពុងសិក្សា នៅសាលារៀន, សាកលវិទ្យាល័យ,
                ឬក៏ចង់បង្កើនចំណេះដឹងផ្ទាល់ខ្លួន
              </p>
              <button className="bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-md animate-bounce-in">
                <span className="font-medium">ចាប់ផ្តើមឥឡូវ</span>
               
              </button> 
            </div>
          </div>
          <div className="hidden sm:block w-full">
            <div className="flex justify-center lg:justify-end">
              <img
                src={image}
                alt="Illustration"
                className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[400px] xl:max-w-[500px] h-auto object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;