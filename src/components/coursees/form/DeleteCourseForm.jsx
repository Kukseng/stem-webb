import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetAllCoursesQuery,
  useDeleteCourseByUuidMutation,
} from "../../../api/courses-api";
import { FiAlertCircle, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { AuthContext } from "../../../components/context/AuthContext";

const DeleteCourseForm = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const accessToken = user?.accessToken;

  console.log("DeleteCourseForm accessToken:", accessToken); // Debug accessToken

  const { data: courses, isLoading: coursesLoading } = useGetAllCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseByUuidMutation();

  const handleDelete = async () => {
    if (!accessToken) {
      setModalContent({
        type: "error",
        message: "សូមចូលគណនីដើម្បីលុបវគ្គសិក្សា។",
      });
      setIsModalOpen(true);
      return;
    }

    try {
      await deleteCourse(selectedCourseId).unwrap();
      setModalContent({
        type: "success",
        message: "បានលុបវគ្គសិក្សាដោយជោគជ័យ!",
      });
      setIsModalOpen(true);
      setSelectedCourseId("");
    } catch (error) {
      console.error("Error deleting course:", error);
      setModalContent({
        type: "error",
        message:
          "បរាជ័យក្នុងការលុបវគ្គសិក្សា: " +
          (error.data?.detail || "កំហុសមិនស្គាល់"),
      });
      setIsModalOpen(true);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedCourseId) {
      setModalContent({
        type: "error",
        message: "សូមជ្រើសរើសវគ្គសិក្សាដែលត្រូវលុប។",
      });
      setIsModalOpen(true);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center h-full font-suwannaphum">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 font-suwannaphum">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
          លុបវគ្គសិក្សា
        </h1>

        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
            ជ្រើសរើសវគ្គសិក្សាដែលត្រូវលុប
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
            required
          >
            <option value="">-- ជ្រើសរើសវគ្គសិក្សា --</option>
            {courses?.results?.length > 0 ? (
              courses.results.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                គ្មានវគ្គសិក្សា
              </option>
            )}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmDelete}
          disabled={!selectedCourseId || isDeleting}
          className={`w-full p-2 sm:p-3 rounded-lg transition-all flex items-center justify-center text-sm sm:text-base ${
            selectedCourseId && !isDeleting
              ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiTrash2 className="mr-2" />
          {isDeleting ? "កំពុងលុប..." : "លុបវគ្គសិក្សា"}
        </motion.button>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md bg-white text-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FiAlertCircle className="text-red-600 text-2xl sm:text-3xl" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold mb-2">បញ្ជាក់ការលុប</h3>
                <p className="text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  តើអ្នកប្រាកដជាចង់លុបវគ្គសិក្សានេះមែនទេ? វគ្គសិក្សានេះមិនអាចត្រឡប់វិញបានទេ។
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-gray-200 text-gray-800 rounded-full font-medium text-sm sm:text-base w-full sm:w-auto"
                  >
                    បោះបង់
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-red-600 text-white rounded-full font-medium text-sm sm:text-base w-full sm:w-auto"
                  >
                    លុប
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Error Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md ${
                modalContent.type === "success"
                  ? "bg-gradient-to-br from-green-500 to-teal-600"
                  : "bg-gradient-to-br from-red-500 to-pink-600"
              } text-white`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-4">
                  {modalContent.type === "success" ? (
                    <FiCheckCircle className="text-green-600 text-2xl sm:text-3xl" />
                  ) : (
                    <FiAlertCircle className="text-red-600 text-2xl sm:text-3xl" />
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold mb-2">
                  {modalContent.type === "success" ? "ជោគជ័យ!" : "បរាជ័យ!"}
                </h3>
                <p className="text-center mb-4 sm:mb-6 text-sm sm:text-base">{modalContent.message}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-white text-gray-800 rounded-full font-medium text-sm sm:text-base"
                >
                  បិទ
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteCourseForm;