import React from "react";
import banner from "../../../assets/banner-Conten.svg";
import lg from "../../../assets/logo-Conten.svg";
import { FaFacebook } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Form_Commend from "../../common/Form_Commend";
const Conten = () => (
  <div className="font-suwannaphum max-w-[1300px] mx-auto p-10 flex gap-10">
    {/* Main Content */}
    <div className="w-3/4">
      <h1 className="text-3xl font-bold mb-5">វគ្គសិក្សារ HTML ល្អបំផុតសម្រាប់ឆ្នាំ 2025 🚀</h1>
      <div className="flex gap-3 text-gray-600 items-center">
        <FaUser/>
        <p> Determined-poitras</p>
        <MdOutlineDateRange className="flex items-center"/>
        <p> មករា 24, 2023</p>
        <FaCommentAlt/>
        <p> 20 មតិ</p>
      </div>

      <div className="mt-5">
        <img src={banner} alt="HTML Course 2025" className="w-full rounded-lg" />
      </div>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed">
        បណ្តុំការរៀន HTML
        នេះផ្តល់នូវមេរៀនពេញលេញពីកម្រិតដំបូងដល់កម្រិតខ្ពស់។
      </p>

      <ul className="mt-4 list-disc pl-5 space-y-2">
        <li>HTML Basics – សិក្សាអំពីធាតុ (elements), structure, និងអត្ថបទ formatting។</li>
        <li>CSS Styling – របៀបប្រើ CSS ដើម្បីរចនាគេហទំព័រ។</li>
        <li>JavaScript Introduction – ជំរុញអន្តរកម្មក្នុងគេហទំព័រ។</li>
        <li>Responsive Design – បង្កើតគេហទំព័រដែលអាចប្រើបានល្អលើទូរស័ព្ទនិងកុំព្យូទ័រ។</li>
      </ul>

      <div className="flex items-center gap-4 mt-6">
        <p>ចែករំលែកៈ​</p>
        <FaFacebook/>
        <TiSocialTwitter/>
        <FaInstagramSquare/>
        <FaYoutube/>
      </div>
     <Form_Commend />
    </div>

    {/* Sidebar */}
    <div className="w-1/4">
      <div className=" bg-white p-5 rounded-lg shadow-md mb-5">
         <div className="flex  gap-5">
                 <img src={lg} alt="" />
                 <h3 className="text-lg font-bold "> ឈ្មោះ </h3>
         <p className="text-gray-600">ចូលរួម 5 ឆ្នាំកន្លងទៅ</p>
         </div>
         <br />
        <p className="text-gray-600">Hey! ខ្ញុំគី...</p>
        <br />
        <h3 className="text-lg font-bold">ទីតាំ</h3>
        <p className="text-gray-600">ភ្នំពេញ</p>
        <br />
        <h3 className="text-lg font-bold">បានចូលរួម</h3>
        <p className="text-gray-600">តុលា​ , 20 , 2018</p>
        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg">តាមដាន</button>
      </div>

      <div className="bg-white p-5 ">
        <h3 className="text-lg font-bold">ប្រភេទផ្សេង</h3>
        <ul className="list-none space-y-2 mt-3">
          <div className="flex justify-between">
              <li>ការងារពេញនិយម</li>
              <p>15</p>
          </div>
          <div className="flex justify-between">
              <li>មុខវិជ្ជាល្បីៗ </li>
              <p>15</p>
          </div>
          <div className="flex justify-between">
             <li>ទីផ្សារ</li>
             <p>15</p>
          </div>
          <div className="flex justify-between">
            <li>ចំណេះដឺងទូទៅ </li>
            <p>15</p>
          </div>
          <div className="flex justify-between">
                <li>Academy Camera</li>
                <p>15</p>
          </div>
          <div className="flex justify-between">
              <li>Sigle Family Home </li>
              <p>15</p>
          </div>
        </ul>
      </div>

      <div className="bg-white p-5  mt-5">
        <h3 className="text-lg font-bold">ការបង្ហោះថ្មីៗ</h3>
        <div className="mt-3 space-y-3">
          <div className="flex gap-3​​ rounded-lg shadow-md">
            <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
            <p className="text-sm">📌 រចនាប័ទ្មថ្មី Modern Theme Collection នៅឆ្នាំ 2023</p>
          </div>
          <br />
          <div className="flex gap-3 rounded-lg shadow-md">
            <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
            <p className="text-sm">📌 រចនាប័ទ្មថ្មី Professional Theme Collection នៅឆ្នាំ 2023</p>
          </div>
          <br />
          <div className="flex gap-3 rounded-lg shadow-md">
            <img src={lg} alt="News" className="w-16 h-16 rounded-lg" />
            <p className="text-sm">📌 រចនាប័ទ្មថ្មី Professional Theme Collection នៅឆ្នាំ 2023</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Conten;
