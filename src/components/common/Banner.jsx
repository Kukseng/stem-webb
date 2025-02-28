import React from "react";
import { ChevronRight } from "lucide-react";
import banner from "../../assets/banner-r.png";
const Banner = () => {
  return (
    <div className="bg-gray-500 relative overflow-hidden mx-10">
      <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          {/* Left Content - Text Section */}
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
              ISTEM
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 leading-tight">
              បន្តិចទៀតនឹងក្លាយជាសេសក្រាប់អ្នក
              <br />
              ជើនការក្រុមទិន្នន័យ ក្រុមពេលវេលា
            </h2>
            
            <p className="text-gray-700 mb-6 text-base md:text-lg">
              អ្នកអាចស្វែងយល់ពីអ្វីៗដែល STEM (វិទ្យាសាស្រ្ត, បច្ចេកវិទ្យា, វិស្វកម្ម, និងគណិតវិទ្យា)
              <br />
              តាមរយៈមេរៀនធនធាន, វីដេអូបង្រៀន, លំហាត់អនុវត្ត,
              <br />
              និងការប្រឡងសាកល្បងដើម្បីក្រុមបង្រៀនទិន្នានា។ មិនចាក់ក្នុងមុនសិក្សា នៅសាលារៀន,
              <br />
              សាលាជាមួយ, មុនីជនមុនីទិនដោយដើងយល់ ISTEM
              <br />
              ដូចត្រូវកតសិក្សាផ្សេងៗដែលអាចប្រើប្រាស់បានក្រុមពេលវេលា។
              <br />
              ដោយមានក្រុមទិនបង្រៀនក្បៀបដោយអ្នកជំនាញ និងការត្រួតដោយសមត្ថភាពខ្ពស់ផងដែរ
              <br />
              ISTEM ដូចពុត្រការបន្ទុកទិនន័យ និងឱ្យាទើកកមទាត់តម្លៃដែលសមរម្យ។
            </p>
            
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <span>ចាប់ផ្តើមឥឡូវ</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Right Content - Images Section */}
          <div className="">
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            

          </div>
        </div>
      </div>
      
   
     
    </div>
  );
};

export default Banner;