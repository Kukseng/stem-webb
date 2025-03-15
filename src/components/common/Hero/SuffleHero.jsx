import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Facebook, Linkedin, Github, Instagram } from "lucide-react";

const ShuffleHero = () => {
  return (
    <section className="max-w-content px-6 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full mx-auto">
      {/* Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-suwannaphum bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
          iSTEM
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
          ផ្តល់ឱកាសល្អបំផុតដល់សិស្ស
        </h2>
        <p className="text-gray-600 text-base md:text-lg lg:text-xl font-suwannaphum leading-relaxed mb-8 max-w-lg">
          សិស្សបន្ទាប់ពីបញ្ចប់ថ្នាក់មធ្យមសិក្សាទុតិយភូមិ ឬមិនទាន់បញ្ចប់ ក៏អាចសិក្សានៅលើវេបសាយរបស់យើងបានដែរ។ យើងផ្តល់ចំណេះដឹងទាន់សម័យ និងបទពិសោធន៍អប់រំដែលផ្លាស់ប្តូរជីវិត ដើម្បីជួយអ្នកឈានទៅដល់សក្តានុពលពេញលេញ។
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 128, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-suwannaphum rounded-full text-lg md:text-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md"
        >
          ចាប់ផ្តើមរៀន
          <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Shuffle Grid */}
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

const squareData = [
  { id: 1, src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1325&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" },
  { id: 8, src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&auto=format&fit=crop&w=684&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=882&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&auto=format&fit=crop&w=681&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1820&q=80" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
      className="w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[400px] md:h-[500px] gap-2">
      {squares}
    </div>
  );
};

export default ShuffleHero;