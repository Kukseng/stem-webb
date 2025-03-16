import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Facebook, Linkedin, Github, Instagram } from "lucide-react";
import javaImage from "../../../assets/banner-r.png";
import pic2 from "../../../assets/images/about-us/pic2.png";

const ShuffleHero = () => {
  return (
    <section className="max-w-[1300px] px-6 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full mx-auto">
      {/* Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center"
      >
        <h1 className="text-[30px] md:text-[38px] lg:text-[40px] font-bold font-suwannaphum text-primary mb-4">
          ISTEM
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-suwannaphum">
          ផ្តល់ឱកាសល្អបំផុតដល់សិស្ស
        </h2>
        <p className="text-gray-600 text-[18px] md:text-[22px] lg:text-[24px] font-suwannaphum leading-relaxed mb-8 max-w-lg">
          សិស្សបន្ទាប់ពីបញ្ចប់ថ្នាក់មធ្យមសិក្សាទុតិយភូមិ ឬមិនទាន់បញ្ចប់ ក៏អាចសិក្សានៅលើវេបសាយរបស់យើងបានដែរ។ យើងផ្តល់ចំណេះដឹងទាន់សម័យ និងបទពិសោធន៍អប់រំដែលផ្លាស់ប្តូរជីវិត ដើម្បីជួយអ្នកឈានទៅដល់សក្តានុពលពេញលេញ។
        </p>
        <div className="flex items-center space-x-4">
        <button className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-[16px] sm:text-[18px] md:text-[20px] rounded-full flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-md animate-bounce-in">
                <span className="font-medium">ចាប់ផ្តើមឥឡូវ</span>
              </button>
       
        </div>
      </motion.div>

     
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// Updated squareData with your local images
const squareData = [
  { id: 1, src: pic2 },
  { id: 2, src: javaImage },
  { id: 3, src: pic2 },
  { id: 4, src: javaImage }, // Removed empty string, reusing javaImage
  { id: 5, src: pic2 },
  { id: 6, src: javaImage },
];

const generateSquares = (data) => {
  return data.map((sq) => (
    <motion.div
      key={sq.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white font-suwannaphum text-sm md:text-base font-medium"
        >
          ស្វែងយល់បន្ថែម
        </motion.span>
      </div>
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [shuffledData, setShuffledData] = useState(shuffle([...squareData]));

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setShuffledData(shuffle([...squareData]));
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-2 h-[500px] md:h-[600px] gap-4 relative will-change-transform">
      <AnimatePresence mode="popLayout">
        {generateSquares(shuffledData)}
      </AnimatePresence>
      {/* Optional Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default ShuffleHero;