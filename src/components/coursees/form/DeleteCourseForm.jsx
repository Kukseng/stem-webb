import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetAllCoursesQuery,
  useDeleteCourseByUuidMutation,
} from "../../../api/courses-api";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiBook,
  FiTrash2,
} from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { AuthContext } from "../../../components/context/AuthContext"; // Import AuthContext

const DeleteCourseForm = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { user } = useContext(AuthContext); // Get user from AuthContext
  const accessToken = user?.accessToken; // Extract accessToken from user

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-suwannaphum">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 font-suwannaphum">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
          លុបវគ្គសិក្សា
        </h1>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            ជ្រើសរើសវគ្គសិក្សាដែលត្រូវលុប
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
          className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="p-6 rounded-xl shadow-2xl w-full max-w-md bg-white text-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FiAlertCircle className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-2">បញ្ជាក់ការលុប</h3>
                <p className="text-center mb-6">
                  តើអ្នកប្រាកដជាចង់លុបវគ្គសិក្សានេះមែនទេ? វគ្គសិក្សានេះមិនអាចត្រឡប់វិញបានទេ។
                </p>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium"
                  >
                    បោះបង់
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-600 text-white rounded-full font-medium"
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`p-6 rounded-xl shadow-2xl w-full max-w-md ${
                modalContent.type === "success"
                  ? "bg-gradient-to-br from-green-500 to-teal-600"
                  : "bg-gradient-to-br from-red-500 to-pink-600"
              } text-white`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                  {modalContent.type === "success" ? (
                    <FiCheckCircle className="text-green-600 text-3xl" />
                  ) : (
                    <FiAlertCircle className="text-red-600 text-3xl" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {modalContent.type === "success" ? "ជោគជ័យ!" : "បរាជ័យ!"}
                </h3>
                <p className="text-center mb-6">{modalContent.message}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-white text-gray-800 rounded-full font-medium"
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