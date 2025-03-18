import React, { useState } from "react";
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";
import ShuffleHero from "../common/Hero/SuffleHero.jsx";

import img from "../../assets/images/about-us/cherpheng.png";
import img1 from "../../assets/images/about-us/cherpor.png";
// import img1 from "../../assets/images/logo/ISTAD.png";
// import pic2 from "../../assets/about-us/pic2.jpg";
// import cher from "../../assets/images/logo/cher.png";
import pic3 from "../../assets/images/about-us/pic3.png";
// import pic1 from "../../assets/images/about-us/pic1.png";
import pic2 from "../../assets/images/about-us/pic2.png";
import pic4 from "../../assets/images/about-us/pic4.png";
import pic5 from "../../assets/images/about-us/pic5.png";
import pic6 from "../../assets/images/about-us/pic6.png";
import pic11 from "../../assets/images/about-us/pic11.png"
import pic12 from "../../assets/images/about-us/pic12.png"


// import react from "../../assets/logo-tec/React.png";
import java from "../../assets/logo-tec/java.png";
import JS from "../../assets/JS.png";
// import phyton from "../../assets/logo-tec/Phyton.png";
// import Mongo from "../../assets/logo-tec/Mongo.png";
// import PostSql from "../../assets/logo-tec/postgresql-logo.png";
// import Tailwind from "../../assets/logo-tec/Tailwind.png";
// import Reactjs from "../../assets/logo-tec/React.webp";


const Aboutus = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const techIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200 },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  };

  const faqData = [
    // ... (FAQ data unchanged) ...
    {
      question: "តើ iSTEM Education ជាអ្វី?",
      answer:
        "iSTEM Education រួមបញ្ចូលវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម និងគណិតវិទ្យា (STEM) ដោយផ្តោតលើការច្នៃប្រឌិត និងភាពជាសហគ្រិន។ វាសង្កត់ធ្ងន់ទៅលើការដោះស្រាយបញ្ហា ការគិតបែបរិះគន់ និងការរៀនដោយដៃ ដើម្បីរៀបចំសិស្សសម្រាប់អាជីពក្នុងវិស័យដែលកំពុងរីកចម្រើន។ វាលើកទឹកចិត្តសិស្សឱ្យអភិវឌ្ឍបច្ចេកវិទ្យាថ្មីៗ និងដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិត។",
    },
    {
      question: "តើ iSTEM ខុសពីការអប់រំបែបប្រពៃណីយ៉ាងដូចម្តេច?",
      answer:
        "iSTEM ខុសពីការអប់រំបែបប្រពៃណី ដោយវាផ្តោតលើការរៀនតាមរយៈការអនុវត្តជាក់ស្តែង និងគម្រោងជាក់លាក់ ជាជាងការចងចាំចំណេះដឹងតាមទ្រឹស្តី។ វាលើកទឹកចិត្តឱ្យសិស្សស្វែងរកចម្លើយដោយខ្លួនឯង និងធ្វើការជាក្រុម ខណៈពេលដែលការអប់រំបែបប្រពៃណីភាគច្រើនផ្តោតលើការបង្រៀនតាមសៀវភៅ និងការប្រឡង។",
    },
    {
      question: "តើ iSTEM Education មានអត្ថប្រយោជន៍អ្វីខ្លះ?",
      answer:
        "iSTEM Education ផ្តល់អត្ថប្រយោជន៍ដូចជា ការបង្កើនជំនាញដោះស្រាយបញ្ហា ការគិតបែបច្នៃប្រឌិត និងការត្រៀមខ្លួនសម្រាប់អាជីពទំនើប។ វាជួយសិស្សឱ្យមានជំនាញទន់ (soft skills) ដូចជាការធ្វើការជាក្រុម និងការទំនាក់ទំនង ព្រមទាំងជំនាញបច្ចេកទេសដែលទាមទារនៅក្នុងទីផ្សារការងារ។",
    },
    {
      question: "តើ iSTEM Education សាកសមនឹងក្រុមអាយុប៉ុន្មាន?",
      answer:
        "iSTEM Education សាកសមសម្រាប់គ្រប់ក្រុមអាយុ ចាប់ពីកុមារតូចៗ រហូតដល់មនុស្សធំដែលចង់រៀនជំនាញថ្មី។ សម្រាប់កុមារ វាផ្តោតលើការរៀនតាមរយៈការលេង និងសកម្មភាពសាមញ្ញ ខណៈពេលដែលសម្រាប់យុវជន និងមនុស្សធំ វាផ្តល់ជូននូវគម្រោងស្មុគស្មាញ និងការអភិវឌ្ឍជំនាញវិជ្ជាជីវៈ។",
    },
    {
      question:
        "តើ សាលារៀនអាចបញ្ចូល iSTEM Education ទៅក្នុងកម្មវិធីសិក្សារបស់ពួកគេដោយរបៀបណា?",
      answer:
        "សាលារៀនអាចបញ្ចូល iSTEM Education ដោយការបណ្តុះបណ្តាលគ្រូបង្រៀនឱ្យប្រើវិធីសាស្ត្រអប់រំផ្អែកលើគម្រោង បង្កើតបន្ទប់ពិសោធន៍ STEM និងសហការជាមួយអង្គភាពខាងក្រៅដើម្បីផ្តល់ធនធាន។ ពួកគេក៏អាចរៀបចំកម្មវិធីសិក្សាដែលរួមបញ្ចូលការអនុវត្តជាក់ស្តែង និងការប្រើប្រាស់បច្ចេកវិទ្យាទំនើប។",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const teamMembers = [
    {
      name: "ឈួ អុីឈាន",
      role: "Frontend Developer",
      image: pic2,
      description:
        "អ្នកអភិវឌ្ឍន៍ដែលមានជំនាញក្នុងការបង្កើតកម្មវិធីទំនើប និងជួយសិស្សរៀនជំនាញសរសេរកូដ។",
    },
    {
      name: "រិន​​ ប៊ុនវ៉ាន",
      role: "Presenter",
      image: pic3,
      description:
        "អ្នកអភិវឌ្ឍន៍ដែលមានជំនាញក្នុងការបង្កើតកម្មវិធីទំនើប និងជួយសិស្សរៀនជំនាញសរសេរកូដ។",
    },
    {
      name: "ផន សុធារ៉ា",
      role: "UX/UI Designer",
      image: pic4,
      description:
        "អ្នករចនាដែលផ្តោតលើការបង្កើតបទពិសោធន៍អ្នកប្រើប្រាស់ដ៏ល្អ និងការអប់រំតាមរយៈការរចនា។",
    },
    {
      name: "ធឿន ចន្ថាត ",
      role: "Frontend Developer",
      image: pic6,
      description:
        "គ្រូបង្រៀនដែលជួយសិស្សអភិវឌ្ឍជំនាញ STEM តាមរយៈវគ្គសិក្សាអនុវត្តជាក់ស្តែង។",
    },
    {
      name: "ភូ​ កុកសេង",
      role: "Frontend Developer",
      image: pic5,
      description:
        "អ្នកសម្របសម្រួលកម្មវិធីដែលភ្ជាប់ទំនាក់ទំនងរវាងសិស្ស និងអ្នកណែនាំក្នុងវិស័យ iSTEM។",
    },
    {
      name: "សុខ រីណា",
      role: "Content Creator",
      image: pic11,
      description:
        "អ្នកបង្កើតមាតិកាដែលផលិតធនធានអប់រំដ៏ទាក់ទាញសម្រាប់សិស្ស iSTEM។",
    },
    {
      name: "សុខ រីណា",
      role: "Content Creator",
      image: pic12,
      description:
        "អ្នកបង្កើតមាតិកាដែលផលិតធនធានអប់រំដ៏ទាក់ទាញសម្រាប់សិស្ស iSTEM។",
    },
    {
      name: "សុខ រីណា",
      role: "Content Creator",
      image: pic12,
      description:
        "អ្នកបង្កើតមាតិកាដែលផលិតធនធានអប់រំដ៏ទាក់ទាញសម្រាប់សិស្ស iSTEM។",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-white to-gray-50 ">
      <div className=" 2xl:mx-48 mx-8 sm:mx-8 my-5 lg:mx-40">
        <ShuffleHero />
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
      ></motion.div>
      -
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h3 className="text-primary text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          ណែនាំដោយ
        </h3>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-4 sm:mx-8 lg:mx-16 flex flex-wrap justify-center gap-8 py-10"
      >

        <motion.div

          variants={itemVariants}
          whileHover={{
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transform transition-all duration-300"
        >
          <div className="flex justify-center p-6">
            <img
              className="rounded-full w-48 h-48 object-cover border-4 border-primary"
              src={img}
              alt="Teacher"
            />
          </div>
          <div className="p-5 text-center">
            <h5 className="text-2xl font-bold text-gray-900">
              គឹម ចាន់សុផេង
            </h5>
            <p className="text-cyan-700 font-suwannaphum">Mentor</p>
            <p className="mb-3 text-gray-700">
              ភ្ជាប់ទំនាក់ទំនងជាមួយអ្នកណែនាំដែលមានបទពិសោធន៍ក្នុងវិស័យ iSTEM
              ដែលផ្តល់ការណែនាំ ចែករំលែកការយល់ដឹងអំពីឧស្សាហកម្ម
              និងជួយអ្នកក្នុងការច្នៃប្រឌិត និងអភិវឌ្ឍ។
            </p>
            <motion.div
              className="flex justify-center gap-4"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div whileHover={{ scale: 1.2, color: "#1877F2" }}>
                <Facebook className="text-gray-700" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#0A66C2" }}>
                <Linkedin className="text-gray-700" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div

          variants={itemVariants}
          whileHover={{
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transform transition-all duration-300"
        >
          <div className="flex justify-center p-6">
            <img
              className="rounded-full w-48 h-48 object-cover border-4 border-primary"
              src={img1}
              alt="Teacher"
            />
          </div>
          <div className="p-5 text-center">
            <h5 className="text-2xl font-bold text-gray-900">
              ស្រេង ជីប៉
            </h5>
            <p className="text-cyan-700 font-suwannaphum">Mentor</p>
            <p className="mb-3 text-gray-700">
              ភ្ជាប់ទំនាក់ទំនងជាមួយអ្នកណែនាំដែលមានបទពិសោធន៍ក្នុងវិស័យ iSTEM
              ដែលផ្តល់ការណែនាំ ចែករំលែកការយល់ដឹងអំពីឧស្សាហកម្ម
              និងជួយអ្នកក្នុងការច្នៃប្រឌិត និងអភិវឌ្ឍ។
            </p>
            <motion.div
              className="flex justify-center gap-4"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div whileHover={{ scale: 1.2, color: "#1877F2" }}>
                <Facebook className="text-gray-700" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#0A66C2" }}>
                <Linkedin className="text-gray-700" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h3 className="text-primary text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-suwannaphum">
          សមាជិកក្រុម
        </h3>
      </motion.div>
      <div className="flex justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className=" sm:mx-8 lg:mx-52 grid grid-cols-1 sm:grid-cols-2 lg:gap-10 lg:grid-cols-4 w-full gap-8 max-w-7xl lg:max-w-full mx-auto "
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm transform transition-all duration-300 overflow-hidden "
            >
              <div className="flex justify-center p-6 bg-gradient-to-b from-cyan-50 to-white ">
                <img
                  className="rounded-full w-48 h-48 object-cover border-4 border-cyan-500"

                  src={member.image}
                  alt={member.name}
                />
              </div>
              <div className="p-4 text-center">
                <h5 className="text-2xl font-bold text-gray-900 font-suwannaphum">
                  {member.name}
                </h5>
                <p className="text-cyan-700 font-suwannaphum">{member.role}</p>
                <p className="mb-3 text-gray-700 font-suwannaphum">
                  {member.description}
                </p>
                <div className="flex justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.2, color: "#1877F2" }}>
                    <Facebook className="text-gray-700" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: "#0A66C2" }}>
                    <Linkedin className="text-gray-700" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: "#171515" }}>
                    <Github className="text-gray-700" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: "#E4405F" }}>
                    <Instagram className="text-gray-700" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center py-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-purple-700 to-pink-500"
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h3 className="text-4xl lg:text-5xl font-bold font-suwannaphum bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
          Our
        </h3>
        <h3 className="text-4xl lg:text-5xl font-bold font-suwannaphum bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
          Tech Stack
        </h3>
        <motion.div
          className="flex justify-center gap-4 flex-wrap py-10 2xl:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            "Frontend",
            "Backend",
            "Database",
            "CMS",
            "CloudTesting",
            "DevOps",
          ].map((stack, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="text-2xl lg:text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer"
            >
              {stack}
            </motion.p>
          ))}
        </motion.div>
        <motion.div
          className="flex justify-center gap-16 2xl:gap-40 flex-wrap"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/react-3d-icon-download-in-png-blend-fbx-gltf-file-formats--logo-javascript-library-frontend-development-social-media-and-tech-tools-pack-design-icons-10887712.png?f=webp"
            alt="React"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-javascript-3d-icon-download-in-png-blend-fbx-gltf-file-formats--html-logo-vue-angular-coding-lang-pack-logos-icons-7577991.png"
            alt="JavaScript"
            className="w-16 lg:w-24 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-tailwind-3d-icon-download-in-png-blend-fbx-gltf-file-formats--html-logo-css-framework-customizable-coding-lang-pack-logos-icons-7577995.png"
            alt="Tailwind"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={java}
            alt="Java"
            className="w-16 lg:w-24 filter drop-shadow-lg"
          />
        </motion.div>

        <motion.div
          className="flex justify-center gap-16 flex-wrap py-10 2xl:gap-40"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/python-3d-icon-download-in-png-blend-fbx-gltf-file-formats--logo-development-code-programming-computer-science-pack-technology-icons-5602757.png?f=webp"
            alt="Python"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-sql-3d-icon-download-in-png-blend-fbx-gltf-file-formats--database-data-management-relational-logo-analysis-coding-lang-pack-logos-icons-7578022.png?f=webp"
            alt="PostgreSQL"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-github-3d-icon-download-in-png-blend-fbx-gltf-file-formats--logo-social-media-pack-logos-icons-6491025.png?f=webp"
            alt="Github"
            className="w-32 lg:w-40 filter drop-shadow-lg"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center font-suwannaphum">
          FAQ
        </h3>
        <p className="text-lg text-gray-600 text-center mt-4 font-suwannaphum">
          សំណួរដែលគេសួរញឹកញាប់អំពី iSTEM Education
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg p-4 mb-4 transition-all duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <p className="text-lg font-semibold text-gray-800 font-suwannaphum">
                {faq.question}
              </p>
              {openQuestion === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 mt-2 font-suwannaphum text-[20px]"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="fixed top-20 right-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-1/2 left-10 w-10 h-10 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
    </div>
  );
};

export default Aboutus;
