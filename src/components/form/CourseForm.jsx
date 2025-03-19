// CourseForm.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../api/courses-api.js";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../api/categories-api.js";
import { useCreateLessonMutation } from "../../api/lessons-api";
import { useCreateSectionMutation } from "../../api/sections-api";
import { useCreateContentMutation } from "../../api/content-api";
import CreateCourseCard from "./CreateCourseCard";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiBook,
  FiFolder,
  FiList,
  FiPlayCircle,
  FiEdit,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import "tailwindcss/tailwind.css";
import {FiChevronDown} from "react-icons/fi";
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const CourseForm = () => {
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

  const [isAddingToExistingCourse, setIsAddingToExistingCourse] =
    useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });

  const { data: courses, isLoading: coursesLoading } = useGetAllCoursesQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        message: "Course structure updated successfully!",
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating course structure:", error);
      setModalContent({
        type: "error",
        message: "Failed to update course structure. Please try again.",
      });
      setIsModalOpen(true);
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

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (coursesLoading || categoriesLoading)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-8 max-w-2xl w-full relative"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          បង្កើតវគ្គសិក្សា
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Course Mode Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-gray-50 p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
              <FiList className="mr-2" style={{ color: primaryColor }} />
              របៀបបង្កើតវគ្គសិក្សា
            </h2>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="courseMode"
                  value="new"
                  checked={!isAddingToExistingCourse}
                  onChange={() => setIsAddingToExistingCourse(false)}
                  className="form-radio"
                  style={{ color: primaryColor }}
                />
                <span className="text-gray-600">បង្កើតវគ្គសិក្សាថ្មី</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="courseMode"
                  value="existing"
                  checked={isAddingToExistingCourse}
                  onChange={() => setIsAddingToExistingCourse(true)}
                  className="form-radio"
                  style={{ color: primaryColor }}
                />
                <span className="text-gray-600">
                  បន្ថែមទៅវគ្គសិក្សាដែលមានស្រាប់
                </span>
              </label>
            </div>
          </motion.div>

          {/* Course Section */}
          <CreateCourseCard
            title="ព័ត៌មានលម្អិតអំពីវគ្គសិក្សា"
            icon={<FiBook className="text-xl" />}
            openSection={openSection}
            sectionKey="course"
            toggleSection={toggleSection}
            primaryColor={primaryColor}
            primaryColorDark={primaryColorDark}
          >
            {!isAddingToExistingCourse ? (
              <>
                <motion.div variants={itemVariants} className="mb-5">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiEdit style={{ color: primaryColor }} />
                    <span>ឈ្មោះវគ្គសិក្សា</span>
                  </label>
                  <input
                    type="text"
                    name="course_name"
                    value={formData.course.course_name}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRing: primaryColor }}
                    placeholder="Enter a descriptive name for your course"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="mb-5">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiList style={{ color: primaryColor }} />
                    <span>ពិពណ៌នាវគ្គសិក្សា</span>
                  </label>
                  <textarea
                    name="course_description"
                    value={formData.course.course_description}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 min-h-24"
                    style={{ focusRing: primaryColor }}
                    placeholder="Describe what students will learn in this course"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiImage style={{ color: primaryColor }} />
                    <span>វគ្គសិក្សា URL</span>
                  </label>
                  <input
                    type="text"
                    name="course_thumbnail"
                    value={formData.course.course_thumbnail}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRing: primaryColor }}
                    placeholder="Add a URL for your course thumbnail image"
                    required
                  />
                  {formData.course.course_thumbnail && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <p className="text-xs text-gray-500 mb-2">មើលជាមុន</p>
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                        <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage className="text-3xl" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </>
            ) : (
              <motion.div variants={itemVariants}>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <FiBook style={{ color: primaryColor }} />
                  <span>ជ្រើសរើសវគ្គសិក្សាដែលមានស្រាប់</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white"
                    style={{ focusRing: primaryColor }}
                    required
                  >
                    <option value="">-- ជ្រើសរើសវគ្គសិក្សា --</option>
                    {courses?.results?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown />
                  </div>
                </div>
                {selectedCourseId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-3 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <p className="text-sm" style={{ color: primaryColor }}>
                      អ្នកបានជ្រើសរើសវគ្គសិក្សា។ ឥឡូវនេះអ្នកអាចបន្ថែមមុខវិជ្ជាថ្មី
                      មេរៀន ផ្នែក និងខ្លឹមសាររបស់វា។
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="text-xs text-gray-500">
                {!isAddingToExistingCourse
                  ? "បង្កើតវគ្គសិក្សាថ្មីជាមួយនឹងព័ត៌មានលម្អិតពិសេស និងរចនាសម្ព័ន្ធខ្លឹមសារ."
                  : "បន្ថែមមាតិកាថ្មីទៅវគ្គសិក្សាដែលមានស្រាប់ពីបណ្របស់អ្នក។"}
              </div>
            </motion.div>
          </CreateCourseCard>

          {/* Category Section */}
          {(isAddingToExistingCourse && selectedCourseId) ||
          !isAddingToExistingCourse ? (
            <CreateCourseCard
              title="ព័ត៌មានលម្អិតអំពីមុខវិជ្ជា"
              icon={<FiFolder className="text-xl" />}
              openSection={openSection}
              sectionKey="category"
              toggleSection={toggleSection}
              primaryColor={primaryColor}
              primaryColorDark={primaryColorDark}
            >
              {isAddingToExistingCourse && (
                <motion.div variants={itemVariants} className="mb-5">
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="categoryMode"
                        value="existing"
                        checked={!createNewCategory}
                        onChange={() => setCreateNewCategory(false)}
                        className="form-radio"
                        style={{ color: primaryColor }}
                      />
                      <span className="text-gray-600">
                        ប្រើមុខវិជ្ជាដែលមានស្រាប់
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="categoryMode"
                        value="new"
                        checked={createNewCategory}
                        onChange={() => setCreateNewCategory(true)}
                        className="form-radio"
                        style={{ color: primaryColor }}
                      />
                      <span className="text-gray-600">បង្កើតមុខវិជ្ជាថ្មី។</span>
                    </label>
                  </div>
                </motion.div>
              )}
              {!createNewCategory && isAddingToExistingCourse ? (
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiFolder style={{ color: primaryColor }} />
                    <span>ជ្រើសរើសមុខវិជ្ជាដែលមានស្រាប់</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white"
                      style={{ focusRing: primaryColor }}
                      required={!createNewCategory}
                    >
                      <option value="">-- ជ្រើសរើសមុខវិជ្ជា --</option>
                      {courseCategories.length > 0 ? (
                        courseCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category_name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          មិនមានមុខវិជ្ជាទេ។
                        </option>
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className="mb-5">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <FiEdit style={{ color: primaryColor }} />
                      <span>ឈ្មោះមុខវិជ្ជា</span>
                    </label>
                    <input
                      type="text"
                      name="category_name"
                      value={formData.category.category_name}
                      onChange={(e) => handleChange(e, "category")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ focusRing: primaryColor }}
                      placeholder="Enter category name"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <FiList style={{ color: primaryColor }} />
                      <span>ព័ត៌មានលម្អិតអំពីមុខវិជ្ជា</span>
                    </label>
                    <textarea
                      name="category_description"
                      value={formData.category.category_description}
                      onChange={(e) => handleChange(e, "category")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 min-h-24"
                      style={{ focusRing: primaryColor }}
                      placeholder="Enter category description"
                      required
                    />
                  </motion.div>
                </>
              )}
            </CreateCourseCard>
          ) : null}

          {/* Lesson Section */}
          <CreateCourseCard
            title="ព័ត៌មានលម្អិតនៃមេរៀន"
            icon={<FiBook className="text-xl" />}
            openSection={openSection}
            sectionKey="lesson"
            toggleSection={toggleSection}
            primaryColor={primaryColor}
            primaryColorDark={primaryColorDark}
          >
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiEdit style={{ color: primaryColor }} />
                <span>ចំណងជើងមេរៀន</span>
              </label>
              <input
                type="text"
                name="lesson_title"
                value={formData.lesson.lesson_title}
                onChange={(e) => handleChange(e, "lesson")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter lesson title"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiImage style={{ color: primaryColor }} />
                <span>រូបភាពមេរៀន URL</span>
              </label>
              <input
                type="text"
                name="lesson_image"
                value={formData.lesson.lesson_image}
                onChange={(e) => handleChange(e, "lesson")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter image URL"
                required
              />
              {formData.lesson.lesson_image && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                >
                  <p className="text-xs text-gray-500 mb-2">មើលឡើងវិញ</p>
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage className="text-3xl" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </CreateCourseCard>

          {/* Section Section */}
          <CreateCourseCard
            title="ព័ត៌មានលម្អិត​​ជំពូក"
            icon={<FiList className="text-xl" />}
            openSection={openSection}
            sectionKey="section"
            toggleSection={toggleSection}
            primaryColor={primaryColor}
            primaryColorDark={primaryColorDark}
          >
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiEdit style={{ color: primaryColor }} />
                <span>ចំណងជើង​​ជំពូក</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.section.title}
                onChange={(e) => handleChange(e, "section")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter section title"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiList style={{ color: primaryColor }} />
                <span>លេខជំពូក</span>
              </label>
              <input
                type="text"
                name="no"
                value={formData.section.no}
                onChange={(e) => handleChange(e, "section")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter section number"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="preview"
                  checked={formData.section.preview}
                  onChange={(e) => handleChange(e, "section")}
                  className="form-checkbox"
                  style={{ color: primaryColor }}
                />
                <span className="text-gray-600">មើលឡើងវិញ</span>
              </label>
            </motion.div>
          </CreateCourseCard>

          {/* Content Section */}
          <CreateCourseCard
            title="ព័ត៌មានលម្អិតអំពីខ្លឹមសារ"
            icon={<FiPlayCircle className="text-xl" />}
            openSection={openSection}
            sectionKey="content"
            toggleSection={toggleSection}
            primaryColor={primaryColor}
            primaryColorDark={primaryColorDark}
          >
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiEdit style={{ color: primaryColor }} />
                <span>ចំណងជើងមាតិកា</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.content.title}
                onChange={(e) => handleChange(e, "content")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter content title"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiList style={{ color: primaryColor }} />
                <span>លេខមាតិកា</span>
              </label>
              <input
                type="text"
                name="no"
                value={formData.content.no}
                onChange={(e) => handleChange(e, "content")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter content number"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="preview"
                  checked={formData.content.preview}
                  onChange={(e) => handleChange(e, "content")}
                  className="form-checkbox"
                  style={{ color: primaryColor }}
                />
                <span className="text-gray-600">មើលឡើងវិញ</span>
              </label>
            </motion.div>
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiFileText style={{ color: primaryColor }} />
                <span>ឯកសារ URL</span>
              </label>
              <input
                type="text"
                name="file"
                value={formData.content.file}
                onChange={(e) => handleChange(e, "content")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter file URL"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mb-5">
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiPlayCircle style={{ color: primaryColor }} />
                <span>វីដេអូ URL</span>
              </label>
              <input
                type="text"
                name="video_url"
                value={formData.content.video_url}
                onChange={(e) => handleChange(e, "content")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter video URL"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                <FiEdit style={{ color: primaryColor }} />
                <span>ចំណងជើងវីដេអូ</span>
              </label>
              <input
                type="text"
                name="video_title"
                value={formData.content.video_title}
                onChange={(e) => handleChange(e, "content")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ focusRing: primaryColor }}
                placeholder="Enter video title"
                required
              />
            </motion.div>
          </CreateCourseCard>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{ backgroundColor: primaryColor }}
            className="w-full p-4 text-white rounded-lg hover:bg-[#106080] transition-all duration-300"
          >
            កែវគ្គសិក្សា
          </motion.button>
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
                  <h3 className="text-3xl font-bold text-center mb-2">
                    {modalContent.type === "success" ? "Success!" : "Error!"}
                  </h3>
                  <p className="text-center mb-6">{modalContent.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      បិទ
                    </button>
                    {modalContent.type === "error" && (
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-white hover:opacity-90 transition-opacity text-red-600 font-semibold w-full py-2 rounded"
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

export default CourseForm;