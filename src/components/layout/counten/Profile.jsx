
import { Pin } from "lucide-react";
import { Mail, Phone,MapPin,Timer,KeyRound,EyeOff } from "lucide-react";
import lg from "../../../assets/logo-Conten.svg";
import { FaBook } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";

const Profile = () => {
  return (
    <div className="font-suwannaphum max-w-[1300px] 2xl:max-w-content2xl lg:max-w-contentlg md:max-w-contentmd sm:max-w-contentsm mx-auto p-10 flex gap-10">
        <div className="w-1/4 ">
           <div className="mb-10">
           <div className=" bg-white p-5 mb-10 justify-between">
            <div className="text-gray-800 mb-10">
                  <h2 ><a href="#" className="flex  items-center justify-between"><div className="flex items-center gap-2"><FaBook/> ការគ្រប់គ្រង</div> <FaChevronRight /></a></h2>
                 </div>
                  <div className="text-gray-800 mb-10">
                     <h2 ><a href="#" className="flex  items-center justify-between"><div className="flex items-center gap-2"><FaBook/> វីដេអូសិក្សា</div> <FaChevronRight /></a></h2>
                 </div>
                 <div className="text-gray-800 mb-10">
                        <h2 ><a href="#" className="flex  items-center justify-between"><div className="flex items-center gap-2"><FaBook/> របាយការណ៍ម៉ោង</div> <FaChevronRight /></a></h2>
                 </div>
                  <div className="text-gray-800 mb-10">
                     <h2 ><a href="#" className="flex  items-center justify-between"><div className="flex items-center gap-2"><FaBook/> របាយការណ៍សំណួរ</div> <FaChevronRight /></a></h2>
                 </div>
          </div>
            <div>
            <button className=" border border-gray-500 text-gray-700 px-4 py-2 rounded-full flex items-center gap-5">
             បោះបង់ <VscSignOut /> 
          </button>
            </div>
           </div>
        </div>

      <div className="w-3/4">
      {/* Header */}
      <div className="font-bold text-2xl text-gray-800 mb-6">
        <h1>កម្រោងព័ត៍មាន​អ្នកប្រើប្រាស់</h1>
        <hr className="mb-6" />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-6">
        <img src={lg} alt="Profile" className="w-20 h-20 rounded-full object-cover" />

        <div className="flex flex-col">
          <h1 className="text-lg font-bold">សុវណ្ណរាគី</h1>
          <p className="text-gray-600">សិស្ស</p>
          <p className="text-gray-600">ភ្នំពេញ​, ...</p>
        </div>

        <div className="ml-auto flex gap-4">
          <button className="bg-[#16789E] text-white px-4 py-2 rounded-full">
            ប្ដូររូបថតថ្មី
          </button>
          <button className="border border-gray-500 text-gray-700 px-4 py-2 rounded-full">
            លុប
          </button>
        </div>
      </div>

      <hr className="my-6" />

      {/* Form Section */}
      <div className="max-w mx-auto p-6 bg-white rounded-lg ">
        {/* First Row: First Name & Last Name */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះដំបូង</label>
            <input 
              type="text" 
              placeholder="eg. Alaa" 
              className="w-full border rounded-lg p-3 focus:outline-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">នាមត្រកូល</label>
            <input 
              type="text" 
              placeholder="eg. Mohamed" 
              className="w-full border rounded-lg p-3 focus:outline-blue-500"
            />
          </div>
        </div>

        {/* Second Row: Username */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះ​អ្នកប្រើប្រាស់</label>
          <input 
            type="text" 
            placeholder="eg. alaa.mohamed" 
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
          />
        </div>

        <hr className="mb-6 mt-5 " />

        {/* Third Row: Email & Phone */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">អាសយដ្ឋានអ៊ីម៉ែល</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder=" "
                className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">លេខទូរស័ព្ទ</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="tel" 
                placeholder=" "
                className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
              />
            </div>
          </div>
        </div>
        <hr className="mb-6 mt-5 " />
        {/* this is  */}
          <div>
            <h1 className=" font-bold text-[50px] text-gray-800 mb-6 ">សាលា</h1>
          </div>
          <div className="flex font-bold text-[20px] text-gray-800 gap-10">
              <h2 className="flex items-center  gap-5">ProCrew <MdOutlineWork size={20} /></h2>
              <h2 className="flex items-center  gap-5">Noon <MdOutlineWork size={20} /></h2>
              <h2 className="flex items-center  gap-5">LamasaTech <MdOutlineWork size={20} /></h2>
          </div>
          <hr className="mb-6 mt-5 " />
          <div className="mb-6">
          <label  className="block text-gray-700 font-semibold mb-2">ទីតាំ</label>
         
          <div className="relative">
             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
             <input 
                type="map" 
                placeholder=" "
                className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
          />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">កំណត់ពេលវេលា</label>
          <div className=" relative">
           <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="time" 
              placeholder=" "
              className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
            
          />
          </div>
        </div>
        <hr className="mb-6 mt-5 " />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder=" "
                className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ពាក្យសម្ងាត់ថ្មី</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                placeholder=" "
                className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
              />
            </div>
          </div>
        </div>
        <hr className="mb-6 mt-5 " />
          <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">បញ្ជាក់ពាក្យសំងាត់ថ្មី</label>
          <div className=" relative">
            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              placeholder=" "
              className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
           />
          </div>
        </div>
        <div className="ml-auto flex gap-4 justify-end">
          <button className=" border border-gray-500 text-gray-700 px-4 py-2 rounded-full ">
            បោះបង់
          </button>
          <button className=" bg-[#16789E] border border-gray-500 text-white px-4 py-2 rounded-full">
            រក្សាការផ្លាស់ប្ដូ
          </button>
        </div>
      </div>
      </div>
    </div>

  );
}

export default Profile