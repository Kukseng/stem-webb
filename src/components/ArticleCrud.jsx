import React, { useState, useEffect } from "react";
import {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "../api/articles-api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArticleCrud = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);

  // Get logged-in user's username from Redux store
  const username = useSelector((state) => state.auth.username);

  // RTK Query hooks for CRUD operations
  const { data: articlesData, isLoading: articlesLoading, error: articlesError } = useGetAllArticlesQuery();
  const [createArticle, { isLoading: createLoading }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: updateLoading }] = useUpdateArticleMutation();
  const [deleteArticle, { isLoading: deleteLoading }] = useDeleteArticleMutation();
  const { data: articleToEdit, isLoading: articleLoading } = useGetArticleByIdQuery(editArticleId, {
    skip: !editArticleId,
  });

  // Normalize articles data (handle undefined or unexpected structure)
  const articles = Array.isArray(articlesData) ? articlesData : articlesData?.articles || [];

  // Populate form with article data when editing
  useEffect(() => {
    if (isEditing && articleToEdit) {
      setFormData({
        title: articleToEdit.title || "",
        content: articleToEdit.content || "",
        author: articleToEdit.author || "",
      });
    }
  }, [isEditing, articleToEdit]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateArticle({ id: editArticleId, ...formData }).unwrap();
        toast.success("Article updated successfully!");
      } else {
        await createArticle({ ...formData, author: username }).unwrap();
        toast.success("Article created successfully!");
      }
      setFormData({ title: "", content: "", author: "" });
      setIsEditing(false);
      setEditArticleId(null);
    } catch (error) {
      toast.error("Error: " + (error.data?.message || error.message));
    }
  };

  // Handle edit button click
  const handleEdit = (article) => {
    setIsEditing(true);
    setEditArticleId(article.id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id).unwrap();
        toast.success("Article deleted successfully!");
      } catch (error) {
        toast.error("Error: " + (error.data?.message || error.message));
      }
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditArticleId(null);
    setFormData({ title: "", content: "", author: "" });
  };

  // Loading and error states
  if (articlesLoading) return <div className="text-center py-4">Loading articles...</div>;
  if (articlesError) return <div className="text-center py-4 text-red-500">Error: {articlesError.message}</div>;

  // Debug: Log articles to inspect its structure
  console.log("Articles data:", articlesData);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditing ? "Edit Article" : "Create Article"}
      </h1>

      {/* Article Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex justify-end space-x-4">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={createLoading || updateLoading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#1e8fb8] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isEditing ? "Update Article" : "Create Article"}
          </button>
        </div>
      </form>

      {/* Article List */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Article List</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-600">Author: {article.author}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  disabled={deleteLoading}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleCrud;