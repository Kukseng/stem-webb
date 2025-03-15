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
  FiImage,
  FiList,
  FiFolder,
  FiPlayCircle,
  FiFileText,
} from "react-icons/fi";
import "tailwindcss/tailwind.css";

const CreateCourseForm = ({ accessToken }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    course: { course_name: "", course_description: "", course_thumbnail: "" },
    category: { category_name: "", category_description: "" },
    lesson: { lesson_title: "", lesson_image: "" },
    section: { title: "", no: "", preview: false },
    content: { title: "", no: "", preview: false, file: "", video_url: "", video_title: "" },
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

  const courseCategories = categories?.results?.filter((category) => category.course === selectedCourseId) || [];
  const primaryColor = "#16789e";

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: type === "checkbox" ? checked : value },
    }));
  };

  const resetForm = () => {
    setFormData({
      course: { course_name: "", course_description: "", course_thumbnail: "" },
      category: { category_name: "", category_description: "" },
      lesson: { lesson_title: "", lesson_image: "" },
      section: { title: "", no: "", preview: false },
      content: { title: "", no: "", preview: false, file: "", video_url: "", video_title: "" },
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
      setModalContent({ type: "error", message: "សូមចូលគណនីដើម្បីបង្កើតវគ្គសិក្សា។" });
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

      setModalContent({ type: "success", message: "បានបង្កើតវគ្គសិក្សាដោយជោគជ័យ!" });
      setIsModalOpen(true);
      resetForm();
    } catch (error) {
      console.error("Error creating course:", error);
      setModalContent({
        type: "error",
        message: "បរាជ័យក្នុងការបង្កើតវគ្គសិក្សា: " + (error.data?.detail || "កំហុសមិនស្គាល់"),
      });
      setIsModalOpen(true);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return isAddingToExistingCourse ? selectedCourseId !== "" : Object.values(formData.course).every((v) => v.trim() !== "");
      case 2:
        return isAddingToExistingCourse && !createNewCategory ? selectedCategoryId !== "" : Object.values(formData.category).every((v) => v.trim() !== "");
      case 3:
        return Object.values(formData.lesson).every((v) => v.trim() !== "");
      case 4:
        return formData.section.title.trim() !== "" && formData.section.no.trim() !== "";
      case 5:
        return Object.values(formData.content).every((v) => v.trim() !== "");
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
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Progress Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/4 bg-white rounded-xl shadow-lg p-6 sticky top-12 h-fit"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">វគ្គសិក្សា</h2>
          {["វគ្គសិក្សា", "ប្រភេទ", "មេរៀន", "ផ្នែក", "ខ្លឹមសារ"].map((label, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center mb-4 p-2 rounded-lg ${step === index + 1 ? "bg-blue-100" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                  step > index + 1 ? "bg-green-500" : step === index + 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {step > index + 1 ? "✓" : index + 1}
              </div>
              <span className="text-gray-700">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:w-3/4 bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
            បង្កើតវគ្គសិក្សាថ្មី
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Course */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StepHeader icon={<FiBook />} title="ព័ត៌មានវគ្គសិក្សា" />
                <RadioToggle
                  label="បង្កើតវគ្គសិក្សាថ្មី ឬបន្ថែមទៅវគ្គសិក្សាដែលមាន?"
                  options={["បង្កើតថ្មី", "បន្ថែមទៅដែលមាន"]}
                  value={isAddingToExistingCourse ? "បន្ថែមទៅដែលមាន" : "បង្កើតថ្មី"}
                  onChange={(val) => setIsAddingToExistingCourse(val === "បន្ថែមទៅដែលមាន")}
                />
                {!isAddingToExistingCourse ? (
                  <>
                    <InputField
                      label="ឈ្មោះវគ្គសិក្សា"
                      name="course_name"
                      value={formData.course.course_name}
                      onChange={(e) => handleChange(e, "course")}
                      placeholder="បញ្ចូលឈ្មោះវគ្គសិក្សា"
                      icon={<FiBook />}
                    />
                    <TextAreaField
                      label="ការពិពណ៌នាវគ្គសិក្សា"
                      name="course_description"
                      value={formData.course.course_description}
                      onChange={(e) => handleChange(e, "course")}
                      placeholder="ពិពណ៌នាអំពីវគ្គសិក្សា"
                    />
                    <InputField
                      label="URL រូបភាពតូច"
                      name="course_thumbnail"
                      value={formData.course.course_thumbnail}
                      onChange={(e) => handleChange(e, "course")}
                      placeholder="បញ្ចូល URL រូបភាព"
                      icon={<FiImage />}
                      preview={formData.course.course_thumbnail}
                    />
                  </>
                ) : (
                  <SelectField
                    label="ជ្រើសរើសវគ្គសិក្សា"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    options={courses?.results?.map((c) => ({ value: c.id, label: c.course_name })) || []}
                  />
                )}
                <StepButtons nextStep={nextStep} isValid={isStepValid()} />
              </motion.div>
            )}

            {/* Step 2: Category */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StepHeader icon={<FiFolder />} title="ព័ត៌មានប្រភេទ" />
                {isAddingToExistingCourse && (
                  <RadioToggle
                    label="ប្រើប្រភេទដែលមានស្រាប់ ឬបង្កើតថ្មី?"
                    options={["ប្រភេទដែលមាន", "បង្កើតថ្មី"]}
                    value={createNewCategory ? "បង្កើតថ្មី" : "ប្រភេទដែលមាន"}
                    onChange={(val) => setCreateNewCategory(val === "បង្កើតថ្មី")}
                  />
                )}
                {!createNewCategory && isAddingToExistingCourse ? (
                  <SelectField
                    label="ជ្រើសរើសប្រភេទ"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    options={courseCategories.map((c) => ({ value: c.id, label: c.category_name }))}
                  />
                ) : (
                  <>
                    <InputField
                      label="ឈ្មោះប្រភេទ"
                      name="category_name"
                      value={formData.category.category_name}
                      onChange={(e) => handleChange(e, "category")}
                      placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                      icon={<FiFolder />}
                    />
                    <TextAreaField
                      label="ការពិពណ៌នាប្រភេទ"
                      name="category_description"
                      value={formData.category.category_description}
                      onChange={(e) => handleChange(e, "category")}
                      placeholder="បញ្ចូលការពិពណ៌នា"
                    />
                  </>
                )}
                <StepButtons prevStep={prevStep} nextStep={nextStep} isValid={isStepValid()} />
              </motion.div>
            )}

            {/* Step 3: Lesson */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StepHeader icon={<FiBook />} title="ព័ត៌មានមេរៀន" />
                <InputField
                  label="ចំណងជើងមេរៀន"
                  name="lesson_title"
                  value={formData.lesson.lesson_title}
                  onChange={(e) => handleChange(e, "lesson")}
                  placeholder="បញ្ចូលចំណងជើងមេរៀន"
                  icon={<FiBook />}
                />
                <InputField
                  label="URL រូបភាពមេរៀន"
                  name="lesson_image"
                  value={formData.lesson.lesson_image}
                  onChange={(e) => handleChange(e, "lesson")}
                  placeholder="បញ្ចូល URL រូបភាព"
                  icon={<FiImage />}
                  preview={formData.lesson.lesson_image}
                />
                <StepButtons prevStep={prevStep} nextStep={nextStep} isValid={isStepValid()} />
              </motion.div>
            )}

            {/* Step 4: Section */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StepHeader icon={<FiList />} title="ព័ត៌មានផ្នែក" />
                <InputField
                  label="ចំណងជើងផ្នែក"
                  name="title"
                  value={formData.section.title}
                  onChange={(e) => handleChange(e, "section")}
                  placeholder="បញ្ចូលចំណងជើងផ្នែក"
                  icon={<FiList />}
                />
                <InputField
                  label="លេខផ្នែក"
                  name="no"
                  value={formData.section.no}
                  onChange={(e) => handleChange(e, "section")}
                  placeholder="បញ្ចូលលេខផ្នែក"
                  icon={<FiFileText />}
                />
                <CheckboxField
                  label="មានការមើលជាមុន"
                  name="preview"
                  checked={formData.section.preview}
                  onChange={(e) => handleChange(e, "section")}
                />
                <StepButtons prevStep={prevStep} nextStep={nextStep} isValid={isStepValid()} />
              </motion.div>
            )}

            {/* Step 5: Content */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StepHeader icon={<FiPlayCircle />} title="ព័ត៌មានខ្លឹមសារ" />
                <InputField
                  label="ចំណងជើងខ្លឹមសារ"
                  name="title"
                  value={formData.content.title}
                  onChange={(e) => handleChange(e, "content")}
                  placeholder="បញ្ចូលចំណងជើងខ្លឹមសារ"
                  icon={<FiPlayCircle />}
                />
                <InputField
                  label="លេខខ្លឹមសារ"
                  name="no"
                  value={formData.content.no}
                  onChange={(e) => handleChange(e, "content")}
                  placeholder="បញ្ចូលលេខខ្លឹមសារ"
                  icon={<FiFileText />}
                />
                <CheckboxField
                  label="មានការមើលជាមុន"
                  name="preview"
                  checked={formData.content.preview}
                  onChange={(e) => handleChange(e, "content")}
                />
                <InputField
                  label="URL ឯកសារ"
                  name="file"
                  value={formData.content.file}
                  onChange={(e) => handleChange(e, "content")}
                  placeholder="បញ្ចូល URL ឯកសារ"
                  icon={<FiFileText />}
                />
                <InputField
                  label="URL វីដេអូ"
                  name="video_url"
                  value={formData.content.video_url}
                  onChange={(e) => handleChange(e, "content")}
                  placeholder="បញ្ចូល URL វីដេអូ"
                  icon={<FiPlayCircle />}
                />
                <InputField
                  label="ចំណងជើងវីដេអូ"
                  name="video_title"
                  value={formData.content.video_title}
                  onChange={(e) => handleChange(e, "content")}
                  placeholder="បញ្ចូលចំណងជើងវីដេអូ"
                  icon={<FiPlayCircle />}
                />
                <StepButtons prevStep={prevStep} isValid={isStepValid()} submit />
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Modal */}
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
                modalContent.type === "success" ? "bg-gradient-to-br from-green-500 to-teal-600" : "bg-gradient-to-br from-red-500 to-pink-600"
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

// Reusable Components
const StepHeader = ({ icon, title }) => (
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-2xl font-semibold text-gray-800 mb-6 flex items-center"
  >
    {React.cloneElement(icon, { className: "mr-3 text-blue-500" })}
    {title}
  </motion.h2>
);

const InputField = ({ label, name, value, onChange, placeholder, icon, preview }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mb-6"
  >
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder={placeholder}
        required
      />
      {icon && React.cloneElement(icon, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" })}
    </div>
    {preview && (
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={preview}
        alt="Preview"
        className="mt-2 w-24 h-24 object-cover rounded-lg border border-gray-200"
        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
      />
    )}
  </motion.div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mb-6"
  >
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] transition-all"
      placeholder={placeholder}
      required
    />
  </motion.div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mb-6"
  >
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="form-checkbox text-blue-500 h-5 w-5"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  </motion.div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mb-6"
  >
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      required
    >
      <option value="">-- ជ្រើសរើស --</option>
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))
      ) : (
        <option value="" disabled>
          គ្មានជម្រើស
        </option>
      )}
    </select>
  </motion.div>
);

const RadioToggle = ({ label, options, value, onChange }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mb-6"
  >
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className="flex space-x-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-2">
          <input
            type="radio"
            name="mode"
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="form-radio text-blue-500"
          />
          <span className="text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  </motion.div>
);

const StepButtons = ({ prevStep, nextStep, isValid, submit }) => (
  <div className="flex justify-between mt-8">
    {prevStep && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={prevStep}
        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
      >
        ថយក្រោយ
      </motion.button>
    )}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={submit ? "submit" : "button"}
      onClick={!submit ? nextStep : undefined}
      disabled={!isValid}
      className={`px-6 py-3 rounded-lg transition-all ${
        isValid ? "bg-gradient-to-r from-blue-500 to-teal-600 text-white hover:from-blue-600 hover:to-teal-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {submit ? "ដាក់ស្នើ" : "បន្ទាប់"}
    </motion.button>
  </div>
);

export default CreateCourseForm;