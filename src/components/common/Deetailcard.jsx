import React from 'react';
import { motion } from 'framer-motion';
import iconwomen from '../../assets/iconsvg/iconwomen.svg';
import iconbook from '../../assets/iconsvg/iconbook.svg';

// Card data with varied icons and content for visual interest
const cards = [
  {
    title: "ត្រៀមសាងបទពិសោធន៍",
    subtitle: "បង្កើតឱកាសថ្មី",
    description: "សំណាងមិនមែនចៃដន្យទេ វាកើតពីផែនការល្អ និងសកម្មភាពជាក់លាក់។",
    icon: iconwomen,
    bgColor: "from-blue-500 to-indigo-600",
  },
  {
    title: "រៀនពីអ្នកជំនាញ",
    subtitle: "ចំណេះដឹងពិតប្រាកដ",
    description: "ចូលរួមជាមួយមនុស្សដែលមានបទពិសោធន៍ដើម្បីជំរុញភាពជោគជ័យ។",
    icon: iconbook,
    bgColor: "from-teal-500 to-green-600",
  },
  {
    title: "សុខភាពហិរញ្ញវត្ថុ",
    subtitle: "គ្រប់គ្រងប្រាក់",
    description: "រៀនវិធីសាស្ត្រដើម្បីភ្ជាប់សុខភាពហិរញ្ញវត្ថុជាមួយជីវិត។",
    icon: iconwomen,
    bgColor: "from-purple-500 to-pink-600",
  },
];

const FinancialEducationCards = () => {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Staggered entrance
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
    hover: {
      y: -10, // Lift on hover
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Icon animation
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2 font-suwannaphum">
          ការអប់រំហិរញ្ញវត្ថុ
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-suwannaphum">
          បំពាក់ខ្លួនអ្នកជាមួយចំណេះដឹងដើម្បីគ្រប់គ្រងហិរញ្ញវត្ថុប្រកបដោយប្រសិទ្ធភាព
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`relative rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 transform transition-all duration-500`}
          >
            {/* Gradient Top Bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${card.bgColor}`}></div>

            {/* Card Content */}
            <div className="p-6 flex flex-col items-center text-center">
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="mb-6 relative"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center shadow-md">
                  <img src={card.icon} alt={card.title} className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Text Content */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-suwannaphum">
                {card.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3 font-suwannaphum">
                {card.subtitle}
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-suwannaphum max-w-xs">
                {card.description}
              </p>

              {/* Call-to-Action Button */}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-6 px-5 py-2 rounded-full text-white font-medium bg-gradient-to-r ${card.bgColor} shadow-md`}
              >
                ស្វែងយល់បន្ថែម
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FinancialEducationCards;