// components/LoadingOverlay.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360, transition: { duration: 1.5, repeat: Infinity, ease: 'linear' } }} className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full" />
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingOverlay;