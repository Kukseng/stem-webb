import React, { useState } from "react"; 
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import img from "../../assets/images/logo/cher.png";
import img1 from "../../assets/images/logo/ISTAD.png";
import react from "../../assets/React.png";
import java from "../../assets/Java-Symbol.png";
import JS from "../../assets/JS.png";
import phyton from "../../assets/Phyton.png";
import Mongo from "../../assets/Mongo.png";
import PostSql from "../../assets/postgresql-logo.png";
import Tailwind from "../../assets/Tailwind.png";
import Reactjs from "../../assets/React.webp";

import { motion } from "framer-motion";
import ShuffleHero from "../common/Hero/SuffleHero";

const Aboutus = () => {
  const [openQuestion, setOpenQuestion] = useState(null); 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const techIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  // FAQ data with questions and answers
  const faqData = [
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

  // Toggle function to open/close FAQ answers
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="max-w-content mx-4 sm:mx-8 lg:mx-16 my-5 lg:my-5">
        <ShuffleHero />
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-24 bg-gradient-to-r from-primary via-cyan-500 to-blue-600"
      ></motion.div>

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

      {/* Teacher Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-4 sm:mx-8 lg:mx-16 flex flex-wrap justify-center gap-8 py-10"
      >
        {[1, 2].map((_, index) => (
          <motion.div
            key={index}
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
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h3 className="text-primary text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          សមាជិកក្រុម
        </h3>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-4 sm:mx-8 lg:mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10"
      >
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <motion.div
            key={index}
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
                className="rounded-full w-48 h-48 object-cover border-4 border-cyan-500"
                src={img1}
                alt="Team Member"
              />
            </div>
            <div className="p-5 text-center">
              <h5 className="text-2xl font-bold text-gray-900">ស្រេង ជីប៉</h5>
              <p className="text-cyan-700 font-suwannaphum">Mentor</p>
              <p className="mb-3 text-gray-700">
                ភ្ជាប់ទំនាក់ទំនងជាមួយអ្នកណែនាំដែលមានបទពិសោធន៍ក្នុងវិស័យ iSTEM
                ដែលផ្តល់ការណែនាំ ចែករំលែកការយល់ដឹងអំពីឧស្សាហកម្ម
                និងជួយអ្នកក្នុងការច្នៃប្រឌិត និងអភិវឌ្ឍគម្រោងក្នុងពិភពពិត។
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

      {/* Divider */}
      <div className="flex justify-center py-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-purple-700 to-pink-500"
        ></motion.div>
      </div>

      {/* Tech Stack Section */}
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
          className="flex justify-center gap-4 flex-wrap py-10"
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
          className="flex justify-center gap-16 flex-wrap"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={Reactjs}
            alt="React"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={JS}
            alt="JavaScript"
            className="w-16 lg:w-24 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={Tailwind}
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
          className="flex justify-center gap-16 flex-wrap py-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={phyton}
            alt="Python"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={PostSql}
            alt="PostgreSQL"
            className="w-24 lg:w-32 filter drop-shadow-lg"
          />
          <motion.img
            variants={techIconVariants}
            whileHover="hover"
            src={Mongo}
            alt="MongoDB"
            className="w-32 lg:w-40 filter drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
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
              <p className="text-lg font-semibold  text-gray-800 font-suwannaphum">
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
      <div className="fixed bottom-20 left-10 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-1/2 left-10 w-10 h-10 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
    </div>
  );
};

export default Aboutus;