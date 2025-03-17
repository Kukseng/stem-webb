import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEye, FaArrowLeft, FaShare, FaBookmark, FaPrint } from "react-icons/fa";
import { useGetArticleByIdQuery, useGetAllArticlesQuery } from "../../api/articles-api";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const { user, isLoading: authLoading } = useContext(AuthContext);

  const baseUrl = import.meta.env.VITE_API_URL || "https://stem-api.istad.co/api/";

  const { data: article, isLoading, isError, error, refetch } = useGetArticleByIdQuery(id, {
    skip: !accessToken || !user,
  });

  const { data: allArticles, isLoading: articlesLoading } = useGetAllArticlesQuery(
    { ordering: "-created_at" },
    { skip: !accessToken || !user }
  );

  useEffect(() => {
    console.log("Auth Status:", { user, accessToken, authLoading });
  }, [user, accessToken, authLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = article.title || "Blog Detail";
    }
    return () => {
      document.title = "Blog";
    };
  }, [article]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("km-KH", options);
  };

  const renderContent = (content) => {
    if (!content) return null;
    const paragraphs = content.split("\n").filter((p) => p.trim().length > 0);
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/1200x600?text=No+Image";
    return image.startsWith("http") ? image : `${baseUrl}media/uploads/${image}`;
  };

  const relatedArticles = allArticles?.results
    ? allArticles.results.filter((a) => a.id !== Number(id)).slice(0, 3)
    : [];

  if (authLoading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#16789e] border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">កំពុងផ្ទុកអត្ថបទ...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    let errorMessage = "មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ។ សូមព្យាយាមម្តងទៀត។";
    if (error?.status === "FETCH_ERROR") {
      errorMessage = "បញ្ហាបណ្តាញ៖ មិនអាចភ្ជាប់ទៅ API បាន។ សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត ឬទាក់ទងអ្នកគ្រប់គ្រង។";
    } else if (error?.status === 404) {
      errorMessage = "អត្ថបទមិនត្រូវបានរកឃើញ។";
    } else if (error?.status === 401) {
      errorMessage = "សូមចូលគណនីដើម្បីមើលអត្ថបទនេះ។";
    } else if (error?.status === 500) {
      errorMessage = "កំហុសខាងម៉ាស៊ីនមេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។";
    }

    return (
      <motion.div
        className="max-w-4xl mx-auto px-4 py-16 bg-red-50 rounded-lg shadow-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-2">មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ</h2>
        <p className="text-red-500 mb-4">{errorMessage}</p>
        <div className="space-x-4">
          <motion.button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="inline mr-2" />
            ត្រឡប់ក្រោយ
          </motion.button>
          {error?.status === "FETCH_ERROR" && (
            <motion.button
              className="px-4 py-2 bg-[#16789e] text-white rounded-md hover:bg-[#0c5a77] transition-colors"
              onClick={refetch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ព្យាយាមម្តងទៀត
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">មិនមានអត្ថបទត្រូវបានរកឃើញ</p>
        <button
          className="mt-4 px-4 py-2 bg-[#16789e] text-white rounded-md hover:bg-[#0c5a77] transition-colors"
          onClick={handleGoBack}
        >
          <FaArrowLeft className="inline mr-2" />
          ត្រឡប់ក្រោយ
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.button
          className="mb-6 flex items-center text-[#16789e] hover:text-[#0c5a77] transition-colors"
          onClick={handleGoBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft className="mr-2" />
          ត្រឡប់ក្រោយ
        </motion.button>

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <img
              src={getImageUrl(article.image)}
              alt={article.title}
              className="w-full h-80 object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/1200x600?text=No+Image")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
              <div className="flex items-center text-sm space-x-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <FaEye className="mr-1" />
                  <span>{article.views || 0} អ្នកអាន</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-end mb-6 space-x-2">
              <motion.button
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Share"
              >
                <FaShare className="h-4 w-4" />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Bookmark"
              >
                <FaBookmark className="h-4 w-4" />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Print"
              >
                <FaPrint className="h-4 w-4" />
              </motion.button>
            </div>

            <motion.div
              className="prose max-w-none text-[24px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {renderContent(article.content)}
            </motion.div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">ប្រភេទ:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "#e5f5fa" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Related Articles Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">អត្ថបទដែលទាក់ទង</h3>
              {articlesLoading ? (
                <div className="text-center text-gray-600">កំពុងផ្ទុកអត្ថបទទាក់ទង...</div>
              ) : relatedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <motion.div
                      key={relatedArticle.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                    >
                      <img
                        src={getImageUrl(relatedArticle.image)}
                        alt={relatedArticle.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")}
                      />
                      <div className="p-4">
                        <h4 className="text-[20px] font-semibold text-gray-800 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-[14px] text-gray-600 mt-1 flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(relatedArticle.created_at)}
                        </p>
                        <p className="text-[16px] text-gray-500 mt-2 line-clamp-2">
                          {relatedArticle.content.split("\n")[0] || "មិនមានអត្ថបទ"}
                        </p>
                        <button
                          className="mt-3 text-[#16789e] hover:text-[#0c5a77] text-sm font-medium transition-colors"
                        >
                          អានបន្ត →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">មិនមានអត្ថបទទាក់ទងទេ។</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;