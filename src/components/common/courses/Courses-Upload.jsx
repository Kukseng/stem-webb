import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  useCreateCourseMutation,
} from '../../../api/courses-api';
import {
  useCreateCategoryMutation,
} from '../../../api/categories-api';
import {
  useCreateLessonMutation,
} from '../../../api/lessons-api';
import {
  useCreateSectionMutation,
} from '../../../api/sections-api';
import {
  useCreateContentMutation,
} from '../../../api/content-api';

// Sub-components (unchanged for brevity, but updated handleChange calls below)
const CourseForm = ({ courseData, handleChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះវគ្គសិក្សា</label>
      <input
        type="text"
        name="course_name"
        value={courseData.course_name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="បញ្ចូលឈ្មោះវគ្គសិក្សា"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">ការពិពណ៌នាវគ្គសិក្សា</label>
      <textarea
        name="course_description"
        value={courseData.course_description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="បញ្ចូលការពិពណ៌នា"
        rows="3"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">រូបភាពគម្របវគ្គសិក្សា</label>
      <input
        type="file"
        name="course_thumbnail"
        onChange={(e) => handleChange(e, [], true)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

const CategoryForm = ({ category, catIndex, handleChange, addLesson, removeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium text-gray-800">ប្រភេទទី {catIndex + 1}</h3>
        <button type="button" className="text-gray-500 hover:text-gray-700">{isOpen ? '▲' : '▼'}</button>
      </div>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះប្រភេទ</label>
            <input
              type="text"
              name="category_name"
              value={category.category_name}
              onChange={(e) => handleChange(e, ['categories', catIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលឈ្មោះប្រភេទ"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ការពិពណ៌នាប្រភេទ</label>
            <textarea
              name="category_description"
              value={category.category_description}
              onChange={(e) => handleChange(e, ['categories', catIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលការពិពណ៌នា"
              rows="3"
              required
            />
          </div>
          {category.lessons.map((lesson, lessonIndex) => (
            <LessonForm
              key={lessonIndex}
              lesson={lesson}
              catIndex={catIndex}
              lessonIndex={lessonIndex}
              handleChange={handleChange}
              addSection={() => addLesson(['categories', catIndex, 'lessons', lessonIndex, 'sections'], { title: '', no: '', preview: false, contents: [{ title: '', no: '', preview: false, file: null, video_url: '', video_title: '' }] })}
            />
          ))}
          <div className="flex space-x-2">
            <button type="button" onClick={() => addLesson(['categories', catIndex, 'lessons'], { lesson_title: '', lesson_image: null, sections: [{ title: '', no: '', preview: false, contents: [{ title: '', no: '', preview: false, file: null, video_url: '', video_title: '' }] }] })} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">បន្ថែមមេរៀន</button>
            <button type="button" onClick={() => removeCategory(catIndex)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">លុបប្រភេទ</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LessonForm = ({ lesson, catIndex, lessonIndex, handleChange, addSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="mt-4 p-4 bg-white rounded-lg border border-gray-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="text-md font-medium text-gray-800">មេរៀនទី {lessonIndex + 1}</h4>
        <button type="button" className="text-gray-500 hover:text-gray-700">{isOpen ? '▲' : '▼'}</button>
      </div>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើងមេរៀន</label>
            <input
              type="text"
              name="lesson_title"
              value={lesson.lesson_title}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលចំណងជើងមេរៀន"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">រូបភាពមេរៀន</label>
            <input
              type="file"
              name="lesson_image"
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex], true)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {lesson.sections.map((section, sectionIndex) => (
            <SectionForm
              key={sectionIndex}
              section={section}
              catIndex={catIndex}
              lessonIndex={lessonIndex}
              sectionIndex={sectionIndex}
              handleChange={handleChange}
              addContent={() => addSection(['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents'], { title: '', no: '', preview: false, file: null, video_url: '', video_title: '' })}
            />
          ))}
          <button type="button" onClick={addSection} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">បន្ថែមជំពូក</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionForm = ({ section, catIndex, lessonIndex, sectionIndex, handleChange, addContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h5 className="text-sm font-medium text-gray-800">ជំពូកទី {sectionIndex + 1}</h5>
        <button type="button" className="text-gray-500 hover:text-gray-700">{isOpen ? '▲' : '▼'}</button>
      </div>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើងជំពូក</label>
            <input
              type="text"
              name="title"
              value={section.title}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលចំណងជើងជំពូក"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">លេខជំពូក</label>
            <input
              type="text"
              name="no"
              value={section.no}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលលេខជំពូក"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="preview"
              checked={section.preview}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex], false, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">មើលជាមុន</label>
          </div>
          {section.contents.map((content, contentIndex) => (
            <ContentForm
              key={contentIndex}
              content={content}
              catIndex={catIndex}
              lessonIndex={lessonIndex}
              sectionIndex={sectionIndex}
              contentIndex={contentIndex}
              handleChange={handleChange}
            />
          ))}
          <button type="button" onClick={addContent} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">បន្ថែមមាតិកា</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContentForm = ({ content, catIndex, lessonIndex, sectionIndex, contentIndex, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="mt-4 p-4 bg-white rounded-lg border border-gray-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h6 className="text-sm font-medium text-gray-800">មាតិកាទី {contentIndex + 1}</h6>
        <button type="button" className="text-gray-500 hover:text-gray-700">{isOpen ? '▲' : '▼'}</button>
      </div>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើងមាតិកា</label>
            <input
              type="text"
              name="title"
              value={content.title}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលចំណងជើងមាតិកា"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">លេខមាតិកា</label>
            <input
              type="text"
              name="no"
              value={content.no}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលលេខមាតិកា"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="preview"
              checked={content.preview}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex], false, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">មើលជាមុន</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ឯកសារ</label>
            <input
              type="file"
              name="file"
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex], true)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL វីដេអូ</label>
            <input
              type="text"
              name="video_url"
              value={content.video_url}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូល URL វីដេអូ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើងវីដេអូ</label>
            <input
              type="text"
              name="video_title"
              value={content.video_title}
              onChange={(e) => handleChange(e, ['categories', catIndex, 'lessons', lessonIndex, 'sections', sectionIndex, 'contents', contentIndex])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="បញ្ចូលចំណងជើងវីដេអូ"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CourseUpload = () => {
  const [courseData, setCourseData] = useState({
    course_name: '',
    course_description: '',
    course_thumbnail: null,
    categories: [
      {
        category_name: '',
        category_description: '',
        lessons: [
          {
            lesson_title: '',
            lesson_image: null,
            sections: [
              {
                title: '',
                no: '',
                preview: false,
                contents: [
                  {
                    title: '',
                    no: '',
                    preview: false,
                    file: null,
                    video_url: '',
                    video_title: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'https://stem-api.istad.co/api/';
  const accessToken = localStorage.getItem('access_token');

  const [createCourse] = useCreateCourseMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createLesson] = useCreateLessonMutation();
  const [createSection] = useCreateSectionMutation();
  const [createContent] = useCreateContentMutation();

  const uploadFile = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${BASE_URL}upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.url || response.data.uuid;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleChange = (e, path = [], isFile = false, checked) => {
    const { name, value, files } = e.target;
    const newValue = isFile ? files[0] : (checked !== undefined ? checked : value); // Handle checkbox separately

    setCourseData((prev) => {
      const updateNested = (obj, [key, ...rest], val) => {
        if (!rest.length) {
          return { ...obj, [key]: val };
        }
        // Safely handle undefined nested objects
        if (obj[key] === undefined) {
          return { ...obj, [key]: [] }; // Initialize as array if undefined
        }
        return {
          ...obj,
          [key]: Array.isArray(obj[key])
            ? obj[key].map((item, idx) =>
                idx === rest[0] ? updateNested(item, rest.slice(1), val) : item
              )
            : updateNested(obj[key], rest, val),
        };
      };
      return path.length ? updateNested(prev, [name, ...path], newValue) : { ...prev, [name]: newValue };
    });
  };

  const addNestedItem = (path, template) => {
    setCourseData((prev) => {
      const updateNested = (obj, [key, ...rest]) => {
        if (!rest.length) {
          return { ...obj, [key]: [...(obj[key] || []), template] }; // Safely handle undefined
        }
        return {
          ...obj,
          [key]: (obj[key] || []).map((item, idx) =>
            idx === rest[0] ? updateNested(item, rest.slice(1)) : item
          ),
        };
      };
      return updateNested(prev, path);
    });
  };

  const removeCategory = (catIndex) => {
    setCourseData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, index) => index !== catIndex),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const courseThumbnailUrl = await uploadFile(courseData.course_thumbnail);
      const courseResponse = await createCourse({
        course_name: courseData.course_name,
        course_description: courseData.course_description,
        course_thumbnail: courseThumbnailUrl,
      }).unwrap();
      const courseId = courseResponse.id;

      for (const [catIndex, category] of courseData.categories.entries()) {
        const categoryResponse = await createCategory({
          category_name: category.category_name,
          category_description: category.category_description,
          course: courseId,
        }).unwrap();
        const categoryId = categoryResponse.id;

        for (const [lessonIndex, lesson] of category.lessons.entries()) {
          const lessonImageUrl = await uploadFile(lesson.lesson_image);
          const lessonResponse = await createLesson({
            lesson_title: lesson.lesson_title,
            lesson_image: lessonImageUrl,
            category: categoryId,
          }).unwrap();
          const lessonId = lessonResponse.id;

          for (const [sectionIndex, section] of lesson.sections.entries()) {
            const sectionResponse = await createSection({
              title: section.title,
              no: section.no,
              preview: section.preview,
              lesson: lessonId,
            }).unwrap();
            const sectionId = sectionResponse.id;

            for (const [contentIndex, content] of section.contents.entries()) {
              const fileUrl = await uploadFile(content.file);
              await createContent({
                title: content.title,
                no: content.no,
                preview: content.preview,
                file: fileUrl,
                video_url: content.video_url,
                video_title: content.video_title,
                section: sectionId,
              }).unwrap();
            }
          }
        }
      }

      alert('Course and all nested items uploaded successfully!');
      setCourseData({
        course_name: '',
        course_description: '',
        course_thumbnail: null,
        categories: [
          {
            category_name: '',
            category_description: '',
            lessons: [
              {
                lesson_title: '',
                lesson_image: null,
                sections: [
                  {
                    title: '',
                    no: '',
                    preview: false,
                    contents: [
                      {
                        title: '',
                        no: '',
                        preview: false,
                        file: null,
                        video_url: '',
                        video_title: '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Failed to upload course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div className="bg-white rounded-xl shadow-sm p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">បញ្ចូលវគ្គសិក្សាថ្មី</h2>
        <form onSubmit={handleSubmit}>
          <CourseForm courseData={courseData} handleChange={handleChange} />
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">ប្រភេទ</h3>
            {courseData.categories.map((category, catIndex) => (
              <CategoryForm
                key={catIndex}
                category={category}
                catIndex={catIndex}
                handleChange={handleChange}
                addLesson={addNestedItem}
                removeCategory={removeCategory}
              />
            ))}
            <button
              type="button"
              onClick={() => addNestedItem(['categories'], 
              { category_name: '', category_description: '', 
              lessons: [{ lesson_title: '', lesson_image: null, sections: 
              [{ title: '', no: '', preview: false, contents: [{ title: '', no: '', preview: false, file: null, video_url: '', video_title: '' }] }] }] })}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              បន្ថែមប្រភេទ
            </button>
          </div>
          <div className="mt-8 flex justify-end">
            <motion.button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium" whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }} whileTap={{ scale: 0.95 }} disabled={isLoading}>
              {isLoading ? 'កំពុងបញ្ចូល...' : 'បញ្ចូលវគ្គសិក្សា'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CourseUpload;