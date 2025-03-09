import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGetCategoryByIdQuery } from "../../../../api/categories-api"; // Adjust the import based on your API setup
import { FaBook, FaList, FaFileAlt } from "react-icons/fa";

const CategoryDetailsPage = () => {
  const { id } = useParams(); // Get category ID from URL
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useGetCategoryByIdQuery(id);

  useEffect(() => {
    if (category) {
      console.log("Category Details:", JSON.stringify(category, null, 2));
    }
  }, [category]);

  if (isLoading) return <div className="p-6">Loading category details...</div>;
  if (isError)
    return (
      <div className="p-6">
        Error: {error?.data?.message || "Failed to fetch category"}
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {category.category_name}
      </h2>
      <p className="text-gray-600 mb-8">
        {category.category_description || "No description available"}
      </p>

      {/* Lessons */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaBook className="mr-2 text-primary" /> មេរៀន
        </h3>
        {category.lessons?.length > 0 ? (
          category.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="mb-6 p-4 bg-white rounded-lg shadow-md"
            >
              <h4 className="text-lg font-semibold text-gray-800">
                {lesson.lesson_title}
              </h4>
              {lesson.lesson_image && (
                <img
                  src={lesson.lesson_image}
                  alt={lesson.lesson_title}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}

              {/* Sections */}
              <div className="mt-4">
                <h5 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                  <FaList className="mr-2 text-primary" /> ជំពូក
                </h5>
                {lesson.sections?.length > 0 ? (
                  lesson.sections.map((section) => (
                    <div
                      key={section.id}
                      className="ml-4 mb-4 p-3 bg-gray-100 rounded-md"
                    >
                      <p className="text-gray-800 font-medium">
                        {section.no}. {section.title}{" "}
                        {section.preview && (
                          <span className="text-green-500 text-sm">
                            (មើលជាមុន)
                          </span>
                        )}
                      </p>

                      {/* Contents */}
                      <div className="mt-2">
                        <h6 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FaFileAlt className="mr-2 text-primary" /> មាតិកា
                        </h6>

                        {section.contents?.length > 0 ? (
                          section.contents.map((content) => (
                            <div
                              key={content.id}
                              className="ml-4 p-2 bg-white rounded-md"
                            >
                              <p className="text-gray-800">
                                {content.no}. {content.title}{" "}
                                {content.preview && (
                                  <span className="text-green-500 text-sm">
                                    (មើលជាមុន)
                                  </span>
                                )}
                              </p>
                              {content.file && (
                                <a
                                  href={content.file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline text-sm"
                                >
                                  ឯកសារ
                                </a>
                              )}
                              {content.video_url && (
                                <div className="mt-2">
                                  <p className="text-gray-700">
                                    {content.video_title || "Video"}
                                  </p>
                                  <a
                                    href={content.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-sm"
                                  >
                                    មើលវីដេអូ
                                  </a>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">មិនមានមាតិកា</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm ml-4">មិនមានជំពូក</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">មិនមានមេរៀន</p>
        )}
      </section>
    </div>
  );
};

export default CategoryDetailsPage;
