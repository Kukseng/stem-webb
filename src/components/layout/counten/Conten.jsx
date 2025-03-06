// import React from "react";
import banner from "../../../assets/banner-Conten.svg";
import lg from "../../../assets/logo-Conten.svg";
import { FaFacebook } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { BiSolidShare } from "react-icons/bi";
import { CircularPagination } from "../../common/Pegenation";

// const Conten = () => (
//   <div className="font-suwannaphum max-w-[1300px] mx-auto p-10 flex gap-10">
//     {/* Main Content */}
//     <div className="w-3/4">
//       <h1 className="text-3xl font-bold mb-5">វគ្គសិក្សារ HTML ល្អបំផុតសម្រាប់ឆ្នាំ 2025 🚀</h1>
//       <div className="flex gap-3 text-gray-600 items-center">
//         <FaUser/>
//         <p> Determined-poitras</p>
//         <MdOutlineDateRange className="flex items-center"/>
//         <p> មករា 24, 2023</p>
//         <FaCommentAlt/>
//         <p> 20 មតិ</p>
//       </div>
//       <div className="mt-5">
//         <img src={banner} alt="HTML Course 2025" className="w-full rounded-lg" />
//       </div>

//       <p className="mt-4 max-w-2xl text-lg leading-relaxed">
//         បណ្តុំការរៀន HTML
//         នេះផ្តល់នូវមេរៀនពេញលេញពីកម្រិតដំបូងដល់កម្រិតខ្ពស់។
//       </p>

//       <ul className="mt-4 list-disc pl-5 space-y-2">
//         <li>HTML Basics – សិក្សាអំពីធាតុ (elements), structure, និងអត្ថបទ formatting។</li>
//         <li>CSS Styling – របៀបប្រើ CSS ដើម្បីរចនាគេហទំព័រ។</li>
//         <li>JavaScript Introduction – ជំរុញអន្តរកម្មក្នុងគេហទំព័រ។</li>
//         <li>Responsive Design – បង្កើតគេហទំព័រដែលអាចប្រើបានល្អលើទូរស័ព្ទនិងកុំព្យូទ័រ។</li>
//       </ul>

//       <div className="flex items-center gap-4 mt-6">
//         <p>ចែករំលែកៈ​</p>
//         <FaFacebook/>
//         <TiSocialTwitter/>
//         <FaInstagramSquare/>
//         <FaYoutube/>
//       </div>
//       <br />
//       <div className="flex gap-20">
//       {/* Left Card */}
//       <div className="rounded-lg shadow-md p-5 flex items-center justify-between w-96 border">
//         <button className="text-gray-500 hover:text-black ">
//           <FaChevronLeft size={20} />
//         </button>
//         <div className="text-center">
//           <p className="text-gray-500 text-sm font-semibold mr-64">អត្ថបទ</p>
//           <h1 className="font-bold text-lg">វគ្គសិក្សារ HTML ល្អបំផុតសម្រាប់ឆ្នាំ</h1>
//           <h1 className="font-bold text-lg ml-44">2025 🚀</h1>
//         </div>
//       </div>
//       {/* Right Card */}
//       <div className="rounded-lg shadow-md p-5 flex items-center justify-between w-96 border">
//         <div className="text-center">
//           <br />
//           <h1 className="font-bold text-lg">វគ្គសិក្សារ HTML ល្អបំផុតសម្រាប់</h1>
//           <h1 className="font-bold text-lg ml-48">2025 🚀</h1>
//         </div>
//         <button className="text-gray-500 hover:text-black">
//           <FaChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//     <br />

//     <div>
//         <div className=" mx-auto p-4 border rounded-lg shadow-md bg-white">
//           <div className="flex items-start space-x-4">
//            <img
//               src={lg}
//               alt="Profile"
//              className="w-12 h-12 rounded-full"
//               />
//              <div className="flex-1">
//                <div className="flex justify-between items-center">
//                    <h3 className="text-lg font-semibold">សុភក្រ្តា</h3>
//                   <span className="text-gray-500 text-sm">កុម្ភៈ 03, 2022</span>
//                </div>
//                   <p className="mt-3 text-gray-700 mr-14 ml-3">
//                       សំណាងល្អសម្រាប់ផ្លូវការផងដែរ! ខ្ញុំរីករាយដែលប្រព័ន្ធសារបានអាចចងចាំដំណើរការចាស់ៗ
//                       HTML ពិតជាមានប្រយោជន៍មែន។ យើងអាចស្វែងយល់បន្ថែមពីការប្រើប្រាស់បន្ថែមទៀត!
//                 </p>
//               <div className="ml-3 mt-3 flex items-center space-x-2 text-blue-500 cursor-pointer">
//             <BiSolidShare/>
//             <span>ឆ្លើយតប</span>
//           </div>
//         </div>
//       </div>
//     </div>
//    </div>
//    <br />
//    <div>
//         <div className=" mx-auto p-4 border rounded-lg shadow-md bg-white">
//           <div className="flex items-start space-x-4">
//            <img
//               src={lg}
//               alt="Profile"
//              className="w-12 h-12 rounded-full"
//               />
//              <div className="flex-1">
//                <div className="flex justify-between items-center">
//                    <h3 className="text-lg font-semibold">សុភក្រ្តា</h3>
//                   <span className="text-gray-500 text-sm">កុម្ភៈ 03, 2022</span>
//                </div>
//                   <p className="mt-3 text-gray-700 mr-14 ml-3">
//                       សំណាងល្អសម្រាប់ផ្លូវការផងដែរ! ខ្ញុំរីករាយដែលប្រព័ន្ធសារបានអាចចងចាំដំណើរការចាស់ៗ
//                       HTML ពិតជាមានប្រយោជន៍មែន។ យើងអាចស្វែងយល់បន្ថែមពីការប្រើប្រាស់បន្ថែមទៀត!
//                 </p>
//               <div className="ml-3 mt-3 flex items-center space-x-2 text-blue-500 cursor-pointer">
//             <BiSolidShare/>
//             <span>ឆ្លើយតប</span>
//           </div>
//         </div>
//       </div>
//     </div>
//    </div>
//    <br />
//    <div>
//         <div className=" mx-auto p-4 border rounded-lg shadow-md bg-white">
//           <div className="flex items-start space-x-4">
//            <img
//               src={lg}
//               alt="Profile"
//              className="w-12 h-12 rounded-full"
//               />
//              <div className="flex-1">
//                <div className="flex justify-between items-center">
//                    <h3 className="text-lg font-semibold">សុភក្រ្តា</h3>
//                   <span className="text-gray-500 text-sm">កុម្ភៈ 03, 2022</span>
//                </div>
//                   <p className="mt-3 text-gray-700 mr-14 ml-3">
//                       សំណាងល្អសម្រាប់ផ្លូវការផងដែរ! ខ្ញុំរីករាយដែលប្រព័ន្ធសារបានអាចចងចាំដំណើរការចាស់ៗ
//                       HTML ពិតជាមានប្រយោជន៍មែន។ យើងអាចស្វែងយល់បន្ថែមពីការប្រើប្រាស់បន្ថែមទៀត!
//                 </p>
//               <div className="ml-3 mt-3 flex items-center space-x-2 text-blue-500 cursor-pointer">
//             <BiSolidShare/>
//             <span>ឆ្លើយតប</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div>
//       <CircularPagination />
//     </div>
//    </div>
//     </div>  
//     {/* Sidebar */}
//     <div className="w-1/4">
//       <div className=" bg-white p-5 rounded-lg shadow-md mb-5">
//          <div className="flex  gap-5">
//                  <img src={lg} alt="" />
//                 <div>
//                 <h3 className="text-lg font-bold "> ឈ្មោះ </h3>
//                 <p className="text-gray-600">ចូលរួម 5 ឆ្នាំកន្លងទៅ</p>
//                 </div>
//          </div>
//          <br />
//         <p className="text-gray-600">Hey! ខ្ញុំគី...</p>
//         <br />
//         <h3 className="text-lg font-bold">ទីតាំ</h3>
//         <p className="text-gray-600">ភ្នំពេញ</p>
//         <br />
//         <h3 className="text-lg font-bold">បានចូលរួម</h3>
//         <p className="text-gray-600">តុលា​ , 20 , 2018</p>
//         <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-[40px]">តាមដាន</button>
//       </div>

//       <div className="bg-white p-5 ">
        
//         <h3 className="text-lg font-bold">ប្រភេទផ្សេង</h3>
//         <ul className="list-none space-y-2 mt-3">
//           <div className="flex justify-between">
            
//               <li><a href="#">ការងារពេញនិយម</a></li>
//               <p>15</p>
//           </div>
//           <div className="flex justify-between">
//               <li><a href="#">មុខវិជ្ជាល្បីៗ</a> </li>
//               <p>15</p>
//           </div>
//           <div className="flex justify-between">
//              <li><a href="#">ទីផ្សារ</a></li>
//              <p>15</p>
//           </div>
//           <div className="flex justify-between">
//             <li><a href="#">ចំណេះដឺងទូទៅ</a> </li>
//             <p>15</p>
//           </div>
//           <div className="flex justify-between">
//                 <li><a href="#">Academy Camera</a></li>
//                 <p>15</p>
//           </div>
//           <div className="flex justify-between">
//               <li><a href="#">Sigle Family Home</a> </li>
//               <p>15</p>
//           </div>
//         </ul>
//       </div>

//       <div className="bg-white p-5  mt-5">
//         <h3 className="text-lg font-bold">ការបង្ហោះថ្មីៗ</h3>
//         <div className="mt-3 space-y-3">
//           <div className="flex gap-3​​ rounded-lg shadow-md">
//             <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
//             <p className="text-sm">📌 រចនាប័ទ្មថ្មី Modern Theme Collection នៅឆ្នាំ 2023</p>
//           </div>
//           <br />
//           <div className="flex gap-3 rounded-lg shadow-md">
//             <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
//             <p className="text-sm">📌 រចនាប័ទ្មថ្មី Professional Theme Collection នៅឆ្នាំ 2023</p>
//           </div>
//           <br />
//           <div className="flex gap-3 rounded-lg shadow-md">
//             <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
//             <p className="text-sm">📌 រចនាប័ទ្មថ្មី Professional Theme Collection នៅឆ្នាំ 2023</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// export default Conten;



// import React from 'react'
// import { Mail, Phone,Map,Timer } from "lucide-react";
// const Profile = () => {
//   return (
    // <div className="font-suwannaphum max-w-[1300px] mx-auto p-10 flex gap-10">
    //     <div className="w-1/4 ">
    //        <div className="mb-10">
    //        <div className=" bg-white p-5 mb-10">
    //        <div className="flex   text-gray-800  justify-between mb-10">
    //           <h2 ><a href="#" className="flex justify-between gap-24 items-center">My name is <FaChevronRight /></a></h2>
    //              </div>
    //               <div className="flex   text-gray-800  justify-between mb-10">
    //                  <h2 ><a href="#" className="flex justify-between gap-24 items-center">My name is <FaChevronRight /></a></h2>
    //              </div>
    //              <div className="flex   text-gray-800  justify-between mb-10">
    //              <h2 ><a href="#" className="flex justify-between gap-24 items-center">My name is <FaChevronRight /></a></h2>
    //              </div>
    //               <div className="flex   text-gray-800  justify-between mb-10">
    //                  <h2 ><a href="#" className="flex justify-between gap-24 items-center">My name is <FaChevronRight /></a></h2>
    //              </div>
    //       </div>
    //         <div>
    //         <button className=" border border-gray-500 text-gray-700 px-4 py-2 rounded-full flex items-center gap-5">
    //          បោះបង់ <FaChevronRight /> 
    //       </button>
    //         </div>
    //        </div>
    //     </div>

    //   <div className="w-3/4">
    //   {/* Header */}
    //   <div className="font-bold text-2xl text-gray-800 mb-6">
    //     <h1>កម្រោងព័ត៍មាន​អ្នកប្រើប្រាស់</h1>
    //     <hr className="mb-6" />
    //   </div>

    //   {/* Profile Section */}
    //   <div className="flex items-center gap-6">
    //     <img src={lg} alt="Profile" className="w-20 h-20 rounded-full object-cover" />

    //     <div className="flex flex-col">
    //       <h1 className="text-lg font-bold">សុវណ្ណរាគី</h1>
    //       <p className="text-gray-600">សិស្ស</p>
    //       <p className="text-gray-600">ភ្នំពេញ​, ...</p>
    //     </div>

    //     <div className="ml-auto flex gap-4">
    //       <button className="bg-[#16789E] text-white px-4 py-2 rounded-full">
    //         ប្ដូររូបថតថ្មី
    //       </button>
    //       <button className="border border-gray-500 text-gray-700 px-4 py-2 rounded-full">
    //         លុប
    //       </button>
    //     </div>
    //   </div>

    //   <hr className="my-6" />

    //   {/* Form Section */}
    //   <div className="max-w mx-auto p-6 bg-white rounded-lg ">
    //     {/* First Row: First Name & Last Name */}
    //     <div className="grid grid-cols-2 gap-6 mb-6">
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះដំបូង</label>
    //         <input 
    //           type="text" 
    //           placeholder="eg. Alaa" 
    //           className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">នាមត្រកូល</label>
    //         <input 
    //           type="text" 
    //           placeholder="eg. Mohamed" 
    //           className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //         />
    //       </div>
    //     </div>

    //     {/* Second Row: Username */}
    //     <div className="mb-6">
    //       <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះ​អ្នកប្រើប្រាស់</label>
    //       <input 
    //         type="text" 
    //         placeholder="eg. alaa.mohamed" 
    //         className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //       />
    //     </div>

    //     <hr className="mb-6 mt-5 " />

    //     {/* Third Row: Email & Phone */}
    //     <div className="grid grid-cols-2 gap-6">
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">អាសយដ្ឋានអ៊ីម៉ែល</label>
    //         <div className="relative">
    //           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    //           <input 
    //             type="email" 
    //             placeholder=" "
    //             className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">លេខទូរស័ព្ទ</label>
    //         <div className="relative">
    //           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    //           <input 
    //             type="tel" 
    //             placeholder=" "
    //             className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="mb-6 mt-5 " />
    //     {/* this is  */}
    //       <div>
    //         <h1 className=" font-bold text-[50px] text-gray-800 mb-6 ">សាលា</h1>
    //       </div>
    //       <div className="flex font-bold text-[20px] text-gray-800  justify-between">
    //           <h2 className="flex items-center  gap-5">My name is <FaChevronRight size={20} /></h2>
    //           <h2 className="flex items-center  gap-5">My name is <FaChevronRight size={20} /></h2>
    //           <h2 className="flex items-center  gap-5">My name is <FaChevronRight size={20} /></h2>
    //       </div>
    //       <hr className="mb-6 mt-5 " />
    //       <div className="mb-6">
    //       <label  className="block text-gray-700 font-semibold mb-2">ទីតាំ</label>
    //       <input 
    //         type="text" 
    //         Map
    //         // placeholder="eg. alaa.mohamed" 
    //         className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //       />
    //     </div>
    //     <div className="mb-6">
    //       <label className="block text-gray-700 font-semibold mb-2">កំណត់ពេលវេលា</label>
    //       <input 
    //         type="text" 
    //         placeholder="eg. alaa.mohamed" 
    //         className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //       />
    //     </div>
    //     <hr className="mb-6 mt-5 " />
    //     <div className="grid grid-cols-2 gap-6">
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
    //         <div className="relative">
    //           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    //           <input 
    //             type="email" 
    //             placeholder=" "
    //             className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label className="block text-gray-700 font-semibold mb-2">ពាក្យសម្ងាត់ថ្មី</label>
    //         <div className="relative">
    //           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    //           <input 
    //             type="tel" 
    //             placeholder=" "
    //             className="w-full border rounded-lg p-3 pl-10 focus:outline-blue-500"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="mb-6 mt-5 " />
    //       <div className="mb-6">
    //       <label className="block text-gray-700 font-semibold mb-2">បញ្ជាក់ពាក្យសំងាត់ថ្មី</label>
    //       <input 
    //         type="text" 
    //         placeholder="eg. alaa.mohamed" 
    //         className="w-full border rounded-lg p-3 focus:outline-blue-500"
    //       />
    //     </div>
    //     <div className="ml-auto flex gap-4 justify-end">
    //       <button className=" border border-gray-500 text-gray-700 px-4 py-2 rounded-full ">
    //         បោះបង់
    //       </button>
    //       <button className=" bg-[#16789E] border border-gray-500 text-white px-4 py-2 rounded-full">
    //         រក្សាការផ្លាស់ប្ដូ
    //       </button>
    //     </div>
    //   </div>
    //   </div>
      
    // </div>

//   );
// }

// export default Profile