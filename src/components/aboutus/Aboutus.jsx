import React, { useEffect } from "react";
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
import java from "../../assets/Java.png";
import JS from "../../assets/JS.png";
import phyton from "../../assets/Phyton.png";
import Mongo from "../../assets/Mongo.png";
import PostSql from "../../assets/PostSql.png";
import Tailwind from "../../assets/Tailwind.png";
import Reactjs from "../../assets/React.png";

import { motion } from "framer-motion"; //motin for animation
import ShuffleHero from "../common/Hero/SuffleHero";

const Aboutus = () => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroImage = document.querySelector(".hero-image");
      const heroText = document.querySelector(".hero-text");

      if (heroImage && heroText) {
        heroImage.style.transform = `translateY(${scrollY * 0.2
          }px) rotate(-10deg)`;
        heroText.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-content mx-4 sm:mx-8 lg:mx-16 my-5 lg:my-5">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="text-primary font-suwannaphum text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
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
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 128, 255, 0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-suwannaphum items-center px-6 py-3 my-6 flex cursor-pointer bg-primary hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg lg:text-2xl text-center transition-all duration-300"
            >
              ចាប់ផ្តើមរៀន <ArrowRight className="ml-2 animate-pulse" />
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.img
              src={img}
              alt="Hero"
              className="w-64 lg:w-96 rotate-[-10deg] hero-image drop-shadow-2xl"
              animate={{
                y: [0, -15, 0],
                rotate: [-10, -12, -10],
              }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              }}
            />
            <div className="absolute -z-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 -bottom-10 -right-10"></div>
          </motion.div>
        </div> */}
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
        {[1, 2,].map((_, index) => (
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
      <div className="flex justify-center">
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
      </div>
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <h3 className="text-4xl lg:text-5xl font-bold text-descrid font-suwannaphum">
          FAQ
        </h3>
        <p className="text-lg lg:text-xl text-descrid font-suwannaphum mt-4">
          5 សំណួរដែលគេសួរញឹកញាប់អំពី iSTEM Education
        </p>
        <div className="flex justify-center flex-wrap py-10">
          <motion.div
            className="w-full lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              "តើ iSTEM Education ជាអ្វី?",
              "តើ iSTEM ខុសពីការអប់រំបែបប្រពៃណីយ៉ាងដូចម្តេច?",
              "តើ iSTEM Education មានអត្ថប្រយោជន៍អ្វីខ្លះ?",
              "តើ iSTEM Education សាកសមនឹងក្រុមអាយុប៉ុន្មាន?",
              "តើ សាលារៀនអាចបញ្ចូល iSTEM Education ទៅក្នុងកម្មវិធីសិក្សារបស់ពួកគេដោយរបៀបណា?",
            ].map((question, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-l-4 border-gradient-to-b from-primary to-cyan-400 pl-4 mt-6 transform transition-all hover:scale-105 hover:bg-blue-50 rounded-r-lg hover:shadow-md p-2"
              >
                <p className="text-lg lg:text-xl text-descrid font-bold font-suwannaphum py-4">
                  {question}
                </p>
                {index === 0 && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg lg:text-xl text-descrid font-suwannaphum leading-relaxed"
                  >
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
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="fixed top-20 right-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed bottom-20 left-10 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-1/2 left-10 w-10 h-10 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
    </div>
  );
};

export default Aboutus;
