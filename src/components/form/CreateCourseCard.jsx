// CreateCourseCard.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const CreateCourseCard = ({
  title,
  icon,
  openSection,
  sectionKey,
  toggleSection,
  children,
  primaryColor,
  primaryColorDark,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6 overflow-hidden rounded-xl shadow-md bg-white"
    >
      <motion.button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        style={{
          backgroundColor: isHovered ? primaryColorDark : primaryColor,
        }}
        className="w-full flex justify-between items-center p-4 text-white rounded-t-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center space-x-2">
          {icon}
          <span className="text-lg font-medium">{title}</span>
        </span>
        <motion.div
          animate={{ rotate: openSection === sectionKey ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-xl" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {openSection === sectionKey && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariants}
            className="p-5 border-t border-gray-100"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CreateCourseCard;