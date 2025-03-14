import React, { useState, useEffect } from "react";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../api/courses-api.js";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../api/categories-api";
import { useCreateLessonMutation } from "../api/lessons-api";
import { useCreateSectionMutation } from "../api/sections-api";
import { useCreateContentMutation } from "../api/content-api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiBook,
  FiChevronDown,
  FiChevronUp,
  FiEdit,
  FiImage,
  FiList,
  FiFolder,
  FiPlayCircle,
  FiFileText,
} from "react-icons/fi";
import "tailwindcss/tailwind.css";

const CreateCourseForm = ({ accessToken }) => {
  const [step, setStep] = useState(1); // Multi-step form
  const [formData, setFormData] = useState({
    course: { course_name: "", course_description: "", course_thumbnail: "" },
    category: { category_name: "", category_description: "" },
    lesson: { lesson_title: "", lesson_image: "" },
    section: { title: "", no: "", preview: false },
    content: {
      title: "",
      no: "",
      preview: false,
      file: "",
      video_url: "",
      video_title: "",
    },
  });

  const [isAddingToExistingCourse, setIsAddingToExistingCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });

  const { data: courses, isLoading: coursesLoading } = useGetAllCoursesQuery();
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [createCourse] = useCreateCourseMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createLesson] = useCreateLessonMutation();
  const [createSection] = useCreateSectionMutation();
  const [createContent] = useCreateContentMutation();

  const courseCategories =
    categories?.results?.filter(
      (category) => category.course === selectedCourseId
    ) || [];

  const primaryColor = "#16789e";
  const primaryColorDark = "#106080";

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const resetForm = () => {
    setFormData({
      course: { course_name: "", course_description: "", course_thumbnail: "" },
      category: { category_name: "", category_description: "" },
      lesson: { lesson_title: "", lesson_image: "" },
      section: { title: "", no: "", preview: false },
      content: {
        title: "",
        no: "",
        preview: false,
        file: "",
        video_url: "",
        video_title: "",
      },
    });
    setStep(1);
    setIsAddingToExistingCourse(false);
    setSelectedCourseId("");
    setSelectedCategoryId("");
    setCreateNewCategory(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setModalContent({
        type: "error",
        message: "សូមចូលគណនីដើម្បីបង្កើតវគ្គសិក្សា។",
      });
      setIsModalOpen(true);
      return;
    }

    try {
      let courseId = selectedCourseId;
      let categoryId = selectedCategoryId;

      if (!isAddingToExistingCourse) {
        const courseResponse = await createCourse(formData.course).unwrap();
        courseId = courseResponse.id;
      }

      if (createNewCategory || !isAddingToExistingCourse) {
        const categoryData = { ...formData.category, course: courseId };
        const categoryResponse = await createCategory(categoryData).unwrap();
        categoryId = categoryResponse.id;
      }

      const lessonData = { ...formData.lesson, category: categoryId };
      const lessonResponse = await createLesson(lessonData).unwrap();
      const lessonId = lessonResponse.id;

      const sectionData = { ...formData.section, lesson: lessonId };
      const sectionResponse = await createSection(sectionData).unwrap();
      const sectionId = sectionResponse.id;

      const contentData = { ...formData.content, section: sectionId };
      await createContent(contentData).unwrap();

      setModalContent({
        type: "success",
        message: "បានធ្វើបច្ចុប្បន្នភាពរចនាសម្ព័ន្ធវគ្គសិក្សាដោយជោគជ័យ!",
      });
      setIsModalOpen(true);
      resetForm();
    } catch (error) {
      console.error("Error updating course structure:", error);
      setModalContent({
        type: "error",
        message: "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពរចនាសម្ព័ន្ធវគ្គសិក្សា: " + (error.data?.detail || "កំហុសមិនស្គាល់"),
      });
      setIsModalOpen(true);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Validation functions for each step
  const isStep1Valid = () => {
    if (isAddingToExistingCourse) {
      return selectedCourseId !== "";
    }
    return (
      formData.course.course_name.trim() !== "" &&
      formData.course.course_description.trim() !== "" &&
      formData.course.course_thumbnail.trim() !== ""
    );
  };

  const isStep2Valid = () => {
    if (isAddingToExistingCourse && !createNewCategory) {
      return selectedCategoryId !== "";
    }
    return (
      formData.category.category_name.trim() !== "" &&
      formData.category.category_description.trim() !== ""
    );
  };

  const isStep3Valid = () => {
    return (
      formData.lesson.lesson_title.trim() !== "" &&
      formData.lesson.lesson_image.trim() !== ""
    );
  };

  const isStep4Valid = () => {
    return (
      formData.section.title.trim() !== "" && formData.section.no.trim() !== ""
    );
  };

  const isStep5Valid = () => {
    return (
      formData.content.title.trim() !== "" &&
      formData.content.no.trim() !== "" &&
      formData.content.file.trim() !== "" &&
      formData.content.video_url.trim() !== "" &&
      formData.content.video_title.trim() !== ""
    );
  };

  // Determine if the "Next" button should be enabled based on the current step
  const isNextButtonEnabled = () => {
    switch (step) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return isStep4Valid();
      case 5:
        return isStep5Valid();
      default:
        return false;
    }
  };

  useEffect(() => {
    if (!isAddingToExistingCourse) {
      setSelectedCourseId("");
      setSelectedCategoryId("");
      setCreateNewCategory(false);
    }
  }, [isAddingToExistingCourse]);

  useEffect(() => {
    setSelectedCategoryId("");
    setCreateNewCategory(false);
  }, [selectedCourseId]);

  if (coursesLoading || categoriesLoading) {
    return (
      <div className="text-center text-gray-500 py-10 font-suwannaphum">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-sm sm:text-base">កំពុងផ្ទុក...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-suwannaphum">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-gray-800 mb-6 text-center">
          បង្កើតវគ្គសិក្សាថ្មី
        </h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {["វគ្គសិក្សា", "ប្រភេទ", "មេរៀន", "ផ្នែក", "ខ្លឹមសារ"].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                    step > index + 1 ? "bg-green-500" : step === index + 1 ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </div>
                <span className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{label}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Course Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FiBook className="mr-2" style={{ color: primaryColor }} />
                ព័ត៌មានវគ្គសិក្សា
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  បង្កើតវគ្គសិក្សាថ្មី ឬបន្ថែមទៅវគ្គសិក្សាដែលមាន?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="courseMode"
                      value="new"
                      checked={!isAddingToExistingCourse}
                      onChange={() => setIsAddingToExistingCourse(false)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-600 text-sm sm:text-base md:text-lg">បង្កើតវគ្គសិក្សាថ្មី</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="courseMode"
                      value="existing"
                      checked={isAddingToExistingCourse}
                      onChange={() => setIsAddingToExistingCourse(true)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-600 text-sm sm:text-base md:text-lg">បន្ថែមទៅវគ្គសិក្សាដែលមាន</span>
                  </label>
                </div>
              </div>

              {!isAddingToExistingCourse ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                      ឈ្មោះវគ្គសិក្សា
                    </label>
                    <input
                      type="text"
                      name="course_name"
                      value={formData.course.course_name}
                      onChange={(e) => handleChange(e, "course")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                      placeholder="បញ្ចូលឈ្មោះវគ្គសិក្សាដែលមានលក្ខណៈពិពណ៌នា"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                      ការពិពណ៌នាវគ្គសិក្សា
                    </label>
                    <textarea
                      name="course_description"
                      value={formData.course.course_description}
                      onChange={(e) => handleChange(e, "course")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-xs sm:text-sm md:text-base"
                      placeholder="ពិពណ៌នាអំពីអ្វីដែលសិស្សនឹងរៀនក្នុងវគ្គសិក្សានេះ"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                      URL រូបភាពតូចរបស់វគ្គសិក្សា
                    </label>
                    <input
                      type="text"
                      name="course_thumbnail"
                      value={formData.course.course_thumbnail}
                      onChange={(e) => handleChange(e, "course")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                      placeholder="បញ្ចូល URL សម្រាប់រូបភាពតូចរបស់វគ្គសិក្សា"
                      required
                    />
                    {formData.course.course_thumbnail && (
                      <div className="mt-2">
                        <img
                          src={formData.course.course_thumbnail}
                          alt="ការមើលជាមុនរូបភាពតូច"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                    ជ្រើសរើសវគ្គសិក្សាដែលមានស្រាប់
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                    required
                  >
                    <option value="">-- ជ្រើសរើសវគ្គសិក្សា --</option>
                    {courses?.results?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isNextButtonEnabled()}
                  className={`px-6 py-3 rounded-lg transition-all text-sm sm:text-base md:text-lg ${
                    isNextButtonEnabled()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  បន្ទាប់
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Category Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FiFolder className="mr-2" style={{ color: primaryColor }} />
                ព័ត៌មានប្រភេទ
              </h2>
              {isAddingToExistingCourse && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                    ប្រើប្រភេទដែលមានស្រាប់ ឬបង្កើតថ្មី?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="categoryMode"
                        value="existing"
                        checked={!createNewCategory}
                        onChange={() => setCreateNewCategory(false)}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-gray-600 text-sm sm:text-base md:text-lg">ប្រើប្រភេទដែលមានស្រាប់</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="categoryMode"
                        value="new"
                        checked={createNewCategory}
                        onChange={() => setCreateNewCategory(true)}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-gray-600 text-sm sm:text-base md:text-lg">បង្កើតប្រភេទថ្មី</span>
                    </label>
                  </div>
                </div>
              )}

              {!createNewCategory && isAddingToExistingCourse ? (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                    ជ្រើសរើសប្រភេទដែលមានស្រាប់
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                    required={!createNewCategory}
                  >
                    <option value="">-- ជ្រើសរើសប្រភេទ --</option>
                    {courseCategories.length > 0 ? (
                      courseCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        គ្មានប្រភេទដែលអាចប្រើបានទេ
                      </option>
                    )}
                  </select>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                      ឈ្មោះប្រភេទ
                    </label>
                    <input
                      type="text"
                      name="category_name"
                      value={formData.category.category_name}
                      onChange={(e) => handleChange(e, "category")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                      placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                      ការពិពណ៌នាប្រភេទ
                    </label>
                    <textarea
                      name="category_description"
                      value={formData.category.category_description}
                      onChange={(e) => handleChange(e, "category")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-xs sm:text-sm md:text-base"
                      placeholder="បញ្ចូលការពិពណ៌នាប្រភេទ"
                      required
                    />
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base md:text-lg"
                >
                  ថយក្រោយ
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isNextButtonEnabled()}
                  className={`px-6 py-3 rounded-lg transition-all text-sm sm:text-base md:text-lg ${
                    isNextButtonEnabled()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  បន្ទាប់
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Lesson Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FiBook className="mr-2" style={{ color: primaryColor }} />
                ព័ត៌មានមេរៀន
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  ចំណងជើងមេរៀន
                </label>
                <input
                  type="text"
                  name="lesson_title"
                  value={formData.lesson.lesson_title}
                  onChange={(e) => handleChange(e, "lesson")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលចំណងជើងមេរៀន"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  URL រូបភាពមេរៀន
                </label>
                <input
                  type="text"
                  name="lesson_image"
                  value={formData.lesson.lesson_image}
                  onChange={(e) => handleChange(e, "lesson")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូល URL រូបភាព"
                  required
                />
                {formData.lesson.lesson_image && (
                  <div className="mt-2">
                    <img
                      src={formData.lesson.lesson_image}
                      alt="ការមើលជាមុនរូបភាពមេរៀន"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base md:text-lg"
                >
                  ថយក្រោយ
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isNextButtonEnabled()}
                  className={`px-6 py-3 rounded-lg transition-all text-sm sm:text-base md:text-lg ${
                    isNextButtonEnabled()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  បន្ទាប់
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Section Details */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FiList className="mr-2" style={{ color: primaryColor }} />
                ព័ត៌មានផ្នែក
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  ចំណងជើងផ្នែក
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.section.title}
                  onChange={(e) => handleChange(e, "section")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលចំណងជើងផ្នែក"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  លេខផ្នែក
                </label>
                <input
                  type="text"
                  name="no"
                  value={formData.section.no}
                  onChange={(e) => handleChange(e, "section")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលលេខផ្នែក"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="preview"
                    checked={formData.section.preview}
                    onChange={(e) => handleChange(e, "section")}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-gray-600 text-sm sm:text-base md:text-lg">មានការមើលជាមុន</span>
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base md:text-lg"
                >
                  ថយក្រោយ
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isNextButtonEnabled()}
                  className={`px-6 py-3 rounded-lg transition-all text-sm sm:text-base md:text-lg ${
                    isNextButtonEnabled()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  បន្ទាប់
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Content Details */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FiPlayCircle className="mr-2" style={{ color: primaryColor }} />
                ព័ត៌មានខ្លឹមសារ
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  ចំណងជើងខ្លឹមសារ
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.content.title}
                  onChange={(e) => handleChange(e, "content")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលចំណងជើងខ្លឹមសារ"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  លេខខ្លឹមសារ
                </label>
                <input
                  type="text"
                  name="no"
                  value={formData.content.no}
                  onChange={(e) => handleChange(e, "content")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលលេខខ្លឹមសារ"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="preview"
                    checked={formData.content.preview}
                    onChange={(e) => handleChange(e, "content")}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-gray-600 text-sm sm:text-base md:text-lg">មានការមើលជាមុន</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  URL ឯកសារ
                </label>
                <input
                  type="text"
                  name="file"
                  value={formData.content.file}
                  onChange={(e) => handleChange(e, "content")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូល URL ឯកសារ"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  URL វីដេអូ
                </label>
                <input
                  type="text"
                  name="video_url"
                  value={formData.content.video_url}
                  onChange={(e) => handleChange(e, "content")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូល URL វីដេអូ"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base md:text-lg">
                  ចំណងជើងវីដេអូ
                </label>
                <input
                  type="text"
                  name="video_title"
                  value={formData.content.video_title}
                  onChange={(e) => handleChange(e, "content")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="បញ្ចូលចំណងជើងវីដេអូ"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base md:text-lg"
                >
                  ថយក្រោយ
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-base md:text-lg"
                >
                  ដាក់ស្នើវគ្គសិក្សា
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                onClick={(e) => e.stopPropagation()}
                className={`${
                  modalContent.type === "success"
                    ? "bg-gradient-to-br from-green-600 to-teal-600"
                    : "bg-gradient-to-br from-red-600 to-pink-600"
                } text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden`}
              >
                {modalContent.type === "success" ? (
                  <FiCheckCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                ) : (
                  <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                )}
                <div className="relative z-10">
                  <div
                    className={`bg-white w-16 h-16 mb-2 rounded-full text-3xl ${
                      modalContent.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    } grid place-items-center mx-auto`}
                  >
                    {modalContent.type === "success" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiAlertCircle />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
                    {modalContent.type === "success" ? "ជោគជ័យ!" : "កំហុស!"}
                  </h3>
                  <p className="text-center mb-6 text-sm sm:text-base md:text-lg">{modalContent.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded text-sm sm:text-base md:text-lg"
                    >
                      បិទ
                    </button>
                    {modalContent.type === "error" && (
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-white hover:opacity-90 transition-opacity text-red-600 font-semibold w-full py-2 rounded text-sm sm:text-base md:text-lg"
                      >
                        ព្យាយាមម្តងទៀត
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CreateCourseForm;