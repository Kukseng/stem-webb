import React from "react";
import { ArrowRight, Facebook, Linkedin } from "lucide-react";
import img from "../../../assets/images/logo/cher.png";
import img1 from "../../../assets/images/logo/ISTAD.png";
import react from "../../../assets/React.png";
import java from "../../../assets/Java.png";
import JS from "../../../assets/JS.png";
import phyton from "../../../assets/Phyton.png";
import Mongo from "../../../assets/Mongo.png";
import PostSql from "../../../assets/PostSql.png";
import Tailwind from "../../../assets/Tailwind.png";
import Reactjs from "../../../assets/React.png";

const Aboutus = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className=" max-w-content mx-4 sm:mx-8 lg:mx-16 my-10 lg:my-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-primary font-suwannaphum text-4xl lg:text-5xl font-bold">
              iSTEM
            </h1>
            <h2 className="text-gray-700 text-3xl lg:text-4xl my-6 lg:my-10 font-bold">
              ផ្តល់ឱកាសល្អបំផុតដល់សិស្ស
            </h2>
            <p className="font-suwannaphum text-lg lg:text-xl text-descrid leading-relaxed">
              សិស្សបន្ទាប់ពីបញ្ចប់ថ្នាក់មធ្យមសិក្សាទុតិយភូមិឬមិនទាន់បញ្ចប់ក៍អាចសិក្សានៅលើវេសាយពួកយើងបានដែរពួកយើងអាចផ្តល់អោយនូវចំណេះដឹងថ្មីៗផ្លែកៗទាន់សម័យ។យើងប្តេជ្ញាផ្តល់ជូននូវបទពិសោធន៍
              អប់រំផ្លាស់ប្តូរដែលផ្តល់អំណាចដល់បុគ្គលម្នាក់ៗឱ្យឈានដល់សក្តានពលពេញលេញរបស់ពួកគេ។
              មិនថាអ្នកជាសិស្សអ្នកសិក្សាពេញមួយជីវិត
              ឬជាអ្នកជំនាញដែលស្វែងរកជំនាញថ្មីនោះទេ យើងផ្តល់ធនធាន
              និងការគាំទ្រដើម្បីជួយអ្នកឱ្យទទួលបានជោគជ័យ។
              យើងផ្តល់ជូននូវកម្មវិធីអប់រំជាច្រើនដែលត្រូវបានរចនាឡើងដើម្បីបំពេញតម្រូវការសិក្សាចម្រុះវគ្គសិក្សារបស់យើងគ្របដណ្តប់លើមុខវិជ្ជាផ្សេងៗគ្នា
            </p>
            <button className="text-white font-suwannaphum items-center px-6 py-3 my-6 flex cursor-pointer bg-primary hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg lg:text-2xl text-center">
              ចាប់ផ្តើមរៀន <ArrowRight className="ml-2" />
            </button>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={img}
              alt="Hero"
              className="w-64 lg:w-96 rotate-[-10deg]"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-24 bg-primary"></div>

      {/* Introduction Section */}
      <div className="text-center py-16">
        <h3 className="text-primary text-4xl lg:text-5xl font-bold">
          ណែនាំដោយ
        </h3>
      </div>

      {/* Teacher Cards */}
      <div className="mx-4 sm:mx-8 lg:mx-16 flex flex-wrap justify-center gap-8 py-10">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-center p-6">
              <img className="rounded-full w-48 h-48" src={img} alt="Teacher" />
            </div>
            <div className="p-5 text-center">
              <h5 className="text-2xl font-bold text-gray-900">Teacher Name</h5>
              <p className="text-cyan-700 font-suwannaphum">Mentor</p>
              <p className="mb-3 text-gray-700">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <div className="flex justify-center gap-4">
                <Facebook className="text-gray-700 hover:text-gray-500" />
                <Linkedin className="text-gray-700 hover:text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="text-center py-16">
        <h3 className="text-primary text-4xl lg:text-5xl font-bold">
          សមាជិកក្រុម
        </h3>
      </div>

      {/* Team Cards */}
      <div className="mx-4 sm:mx-8 lg:mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-center p-6">
              <img
                className="rounded-full w-48 h-48"
                src={img1}
                alt="Team Member"
              />
            </div>
            <div className="p-5 text-center">
              <h5 className="text-2xl font-bold text-gray-900">Team Name</h5>
              <p className="text-cyan-700 font-suwannaphum">Mentor</p>
              <p className="mb-3 text-gray-700">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <div className="flex justify-center gap-4">
                <Facebook className="text-gray-700 hover:text-gray-500" />
                <Linkedin className="text-gray-700 hover:text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex justify-center py-10">
        <div className="h-1 w-24 bg-gradient-to-r from-purple-700 to-pink-500"></div>
      </div>

      {/* Tech Stack Section */}
      <div className="text-center py-16">
        <h3 className="text-4xl lg:text-5xl font-bold font-suwannaphum">Our</h3>
        <h3 className="text-4xl lg:text-5xl font-bold font-suwannaphum">
          Tech Stack
        </h3>
        <div className="flex justify-center gap-4 flex-wrap py-10">
          {[
            "Frontend",
            "Backend",
            "Database",
            "CMS",
            "CloudTesting",
            "DevOps",
          ].map((stack, index) => (
            <p
              key={index}
              className="text-2xl lg:text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
            >
              {stack}
            </p>
          ))}
        </div>
        <div className="flex justify-center gap-16 flex-wrap">
          <img src={Reactjs} alt="React" className="w-24 lg:w-32" />
          <img src={JS} alt="JavaScript" className="w-16 lg:w-24" />
          <img src={Tailwind} alt="Tailwind" className="w-24 lg:w-32" />
          <img src={java} alt="Java" className="w-16 lg:w-24" />
        </div>
        <div className="flex justify-center gap-16 flex-wrap py-10">
          <img src={phyton} alt="Python" className="w-24 lg:w-32" />
          <img src={PostSql} alt="PostgreSQL" className="w-24 lg:w-32" />
          <img src={Mongo} alt="MongoDB" className="w-32 lg:w-40" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="text-center py-16">
        <h3 className="text-4xl lg:text-5xl font-bold text-descrid font-suwannaphum">
          FAQ
        </h3>
        <p className="text-lg lg:text-xl text-descrid font-suwannaphum mt-4">
          5 សំណួរដែលគេសួរញឹកញាប់អំពី iSTEM Education
        </p>
        <div className="flex justify-center flex-wrap py-10">
          <div className="w-full lg:w-2/3">
            {[
              "តើ iSTEM Education ជាអ្វី?",
              "តើ iSTEM ខុសពីការអប់រំបែបប្រពៃណីយ៉ាងដូចម្តេច?",
              "តើ iSTEM Education មានអត្ថប្រយោជន៍អ្វីខ្លះ?",
              "តើ iSTEM Education សាកសមនឹងក្រុមអាយុប៉ុន្មាន?",
              "តើ សាលារៀនអាចបញ្ចូល iSTEM Education ទៅក្នុងកម្មវិធីសិក្សារបស់ពួកគេដោយរបៀបណា?",
            ].map((question, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 mt-6">
                <p className="text-lg lg:text-xl text-descrid font-bold font-suwannaphum py-4">
                  {question}
                </p>
                {index === 0 && (
                  <p className="text-lg lg:text-xl text-descrid font-suwannaphum leading-relaxed">
                    iSTEM Education រួមបញ្ចូលវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា
                    វិស្វកម្ម និងគណិតវិទ្យា (STEM) ដោយផ្តោតលើការច្នៃប្រឌិត
                    និងភាពជាសហគ្រិន។ វាសង្កត់ធ្ងន់ទៅលើការដោះស្រាយបញ្ហា
                    ការគិតបែបរិះគន់ និងការរៀនដោយដៃ
                    ដើម្បីរៀបចំសិស្សសម្រាប់អាជីពក្នុងវិស័យដែលកំពុងរីកចម្រើន។
                    ជាស្នូលរបស់វា ការអប់រំ iSTEM
                    លើកកម្ពស់កម្មវិធីសិក្សាដែលអនុវត្តដោយដៃ និងផ្អែកលើគម្រោង
                    ដោយលើកទឹកចិត្តសិស្សឱ្យចូលរួមជាមួយសម្ភារៈក្នុងវិធីដែលបង្កើតទាំងជំនាញជាក់ស្តែង
                    និងទ្រឹស្តី។ តាមរយៈការបញ្ចូលទិដ្ឋភាពនៃការច្នៃប្រឌិត
                    វាលើកទឹកចិត្តសិស្សមិនត្រឹមតែរៀនចំណេះដឹងដែលមានស្រាប់ប៉ុណ្ណោះទេ
                    ប៉ុន្តែថែមទាំងអភិវឌ្ឍបច្ចេកវិទ្យាថ្មីៗ ដំណើរការ
                    និងដំណោះស្រាយដើម្បីដោះស្រាយបញ្ហាប្រឈមក្នុងសង្គមផងដែរ។
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
