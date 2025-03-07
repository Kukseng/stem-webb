// src/components/TeacherCourseUploadForm.js
import React, { useState } from "react";
import { useCreateCourseMutation } from "../../api/courses-api";
import { useCreateCategoryMutation } from "../../api/categories-api";
import { useCreateLessonMutation } from "../../api/lessons-api";
import { useCreateSectionMutation } from "../../api/sections-api";
import { useCreateContentMutation } from "../../api/content-api";
import { useUploadFileMutation } from "../../api/file-api";

const TeacherCourseUploadForm = () => {
  // Course state
  const [course, setCourse] = useState({
    course_name: "",
    course_description: "",
    course_thumbnail: null,
  });

  // Categories state (array of category objects)
  const [categories, setCategories] = useState([
    { category_name: "", category_description: "", lessons: [] },
  ]);

  // Loading and error states from mutations
  const [createCourse, { isLoading: isCreatingCourse }] =
    useCreateCourseMutation();
  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const [createLesson, { isLoading: isCreatingLesson }] =
    useCreateLessonMutation();
  const [createSection, { isLoading: isCreatingSection }] =
    useCreateSectionMutation();
  const [createContent, { isLoading: isCreatingContent }] =
    useCreateContentMutation();
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();

  // Handle adding new category
  const addCategory = () => {
    setCategories([
      ...categories,
      { category_name: "", category_description: "", lessons: [] },
    ]);
  };

  // Handle adding new lesson to a category
  const addLesson = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].lessons.push({
      lesson_title: "",
      lesson_image: null,
      sections: [],
    });
    setCategories(updatedCategories);
  };

  // Handle adding new section to a lesson
  const addSection = (categoryIndex, lessonIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].lessons[lessonIndex].sections.push({
      title: "",
      no: "",
      preview: false,
      contents: [],
    });
    setCategories(updatedCategories);
  };

  // Handle adding new content to a section
  const addContent = (categoryIndex, lessonIndex, sectionIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].lessons[lessonIndex].sections[
      sectionIndex
    ].contents.push({
      title: "",
      no: "",
      preview: false,
      file: null,
      video_url: "",
      video_title: "",
    });
    setCategories(updatedCategories);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Upload course thumbnail if provided
      let thumbnailUrl = course.course_thumbnail;
      if (course.course_thumbnail instanceof File) {
        const formData = new FormData();
        formData.append("file", course.course_thumbnail);
        const fileResponse = await uploadFile(formData).unwrap();
        thumbnailUrl = fileResponse.url; // Assuming API returns a URL
      }

      // Step 2: Create course
      const courseData = {
        course_name: course.course_name,
        course_description: course.course_description,
        course_thumbnail: thumbnailUrl,
        categories: [],
      };
      const courseResponse = await createCourse(courseData).unwrap();

      // Step 3: Create categories, lessons, sections, and contents
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const categoryData = {
          category_name: category.category_name,
          category_description: category.category_description,
          course: courseResponse.id, // Use course ID from response
        };
        const categoryResponse = await createCategory(categoryData).unwrap();

        for (let j = 0; j < category.lessons.length; j++) {
          const lesson = category.lessons[j];
          let lessonImageUrl = lesson.lesson_image;
          if (lesson.lesson_image instanceof File) {
            const formData = new FormData();
            formData.append("file", lesson.lesson_image);
            const fileResponse = await uploadFile(formData).unwrap();
            lessonImageUrl = fileResponse.url;
          }

          const lessonData = {
            lesson_title: lesson.lesson_title,
            lesson_image: lessonImageUrl,
            category: categoryResponse.id,
            sections: [],
          };
          const lessonResponse = await createLesson(lessonData).unwrap();

          for (let k = 0; k < lesson.sections.length; k++) {
            const section = lesson.sections[k];
            const sectionData = {
              title: section.title,
              no: section.no,
              preview: section.preview,
              lesson: lessonResponse.id,
            };
            const sectionResponse = await createSection(sectionData).unwrap();

            for (let m = 0; m < section.contents.length; m++) {
              const content = section.contents[m];
              let fileUrl = content.file;
              if (content.file instanceof File) {
                const formData = new FormData();
                formData.append("file", content.file);
                const fileResponse = await uploadFile(formData).unwrap();
                fileUrl = fileResponse.url;
              }

              const contentData = {
                title: content.title,
                no: content.no,
                preview: content.preview,
                file: fileUrl,
                video_url: content.video_url,
                video_title: content.video_title,
                section: sectionResponse.id,
              };
              await createContent(contentData).unwrap();
            }
          }
        }
      }

      alert("Course uploaded successfully!");
      // Reset form (optional)
      setCourse({
        course_name: "",
        course_description: "",
        course_thumbnail: null,
      });
      setCategories([
        { category_name: "", category_description: "", lessons: [] },
      ]);
    } catch (error) {
      console.error("Failed to upload course:", error);
      alert(
        "Failed to upload course: " + (error.data?.message || "Unknown error")
      );
    }
  };

  const isLoading =
    isCreatingCourse ||
    isCreatingCategory ||
    isCreatingLesson ||
    isCreatingSection ||
    isCreatingContent ||
    isUploadingFile;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Course Details */}
        <h3>Course Details</h3>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={course.course_name}
            onChange={(e) =>
              setCourse({ ...course, course_name: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label>Course Description:</label>
          <textarea
            value={course.course_description}
            onChange={(e) =>
              setCourse({ ...course, course_description: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label>Course Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCourse({ ...course, course_thumbnail: e.target.files[0] })
            }
            disabled={isLoading}
          />
        </div>

        {/* Categories */}
        <h3>Categories</h3>
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label>Category Name:</label>
              <input
                type="text"
                value={category.category_name}
                onChange={(e) => {
                  const updated = [...categories];
                  updated[catIndex].category_name = e.target.value;
                  setCategories(updated);
                }}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label>Category Description:</label>
              <textarea
                value={category.category_description}
                onChange={(e) => {
                  const updated = [...categories];
                  updated[catIndex].category_description = e.target.value;
                  setCategories(updated);
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Lessons */}
            <h4>Lessons</h4>
            {category.lessons.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label>Lesson Title:</label>
                  <input
                    type="text"
                    value={lesson.lesson_title}
                    onChange={(e) => {
                      const updated = [...categories];
                      updated[catIndex].lessons[lessonIndex].lesson_title =
                        e.target.value;
                      setCategories(updated);
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label>Lesson Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...categories];
                      updated[catIndex].lessons[lessonIndex].lesson_image =
                        e.target.files[0];
                      setCategories(updated);
                    }}
                    disabled={isLoading}
                  />
                </div>

                {/* Sections */}
                <h5>Sections</h5>
                {lesson.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    style={{
                      border: "1px solid #eee",
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <label>Section Title:</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[catIndex].lessons[lessonIndex].sections[
                            sectionIndex
                          ].title = e.target.value;
                          setCategories(updated);
                        }}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label>Section Number:</label>
                      <input
                        type="text"
                        value={section.no}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[catIndex].lessons[lessonIndex].sections[
                            sectionIndex
                          ].no = e.target.value;
                          setCategories(updated);
                        }}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label>Preview:</label>
                      <input
                        type="checkbox"
                        checked={section.preview}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[catIndex].lessons[lessonIndex].sections[
                            sectionIndex
                          ].preview = e.target.checked;
                          setCategories(updated);
                        }}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Contents */}
                    <h6>Contents</h6>
                    {section.contents.map((content, contentIndex) => (
                      <div
                        key={contentIndex}
                        style={{ border: "1px solid #f0f0f0", padding: "1rem" }}
                      >
                        <div>
                          <label>Content Title:</label>
                          <input
                            type="text"
                            value={content.title}
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].title = e.target.value;
                              setCategories(updated);
                            }}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label>Content Number:</label>
                          <input
                            type="text"
                            value={content.no}
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].no = e.target.value;
                              setCategories(updated);
                            }}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label>Preview:</label>
                          <input
                            type="checkbox"
                            checked={content.preview}
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].preview =
                                e.target.checked;
                              setCategories(updated);
                            }}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label>File:</label>
                          <input
                            type="file"
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].file = e.target.files[0];
                              setCategories(updated);
                            }}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label>Video URL:</label>
                          <input
                            type="text"
                            value={content.video_url}
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].video_url =
                                e.target.value;
                              setCategories(updated);
                            }}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label>Video Title:</label>
                          <input
                            type="text"
                            value={content.video_title}
                            onChange={(e) => {
                              const updated = [...categories];
                              updated[catIndex].lessons[lessonIndex].sections[
                                sectionIndex
                              ].contents[contentIndex].video_title =
                                e.target.value;
                              setCategories(updated);
                            }}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        addContent(catIndex, lessonIndex, sectionIndex)
                      }
                      disabled={isLoading}
                    >
                      Add Content
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSection(catIndex, lessonIndex)}
                  disabled={isLoading}
                >
                  Add Section
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLesson(catIndex)}
              disabled={isLoading}
            >
              Add Lesson
            </button>
          </div>
        ))}
        <button type="button" onClick={addCategory} disabled={isLoading}>
          Add Category
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          style={{ marginTop: "1rem" }}
        >
          {isLoading ? "Uploading..." : "Upload Course"}
        </button>
      </form>
    </div>
  );
};

export default TeacherCourseUploadForm;
