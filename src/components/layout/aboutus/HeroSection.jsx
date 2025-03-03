import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import img from "../../../assets/images/logo/cher.png";

const HeroSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroImage = document.querySelector(".hero-image");
      const heroText = document.querySelector(".hero-text");

      if (heroImage && heroText) {
        heroImage.style.transform = `translateY(${
          scrollY * 0.2
        }px) rotate(-10deg)`;
        heroText.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-content mx-4 sm:mx-8 lg:mx-16 my-10 lg:my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      </div>
    </div>
  );
};

export default HeroSection;
