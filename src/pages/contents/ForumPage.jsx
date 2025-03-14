import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateForumMutation,
  useGetAllForumsQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useReplyToForumMutation,
} from "../../api/forums-api";
import { FaSpinner } from "react-icons/fa";
import { useGetProfileQuery } from "../../api/auth-api";
import ForumCard from "../../components/forum/ForumCard";
import ForumForm from "../../components/forum/ForumForm";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ForumPage = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [forumData, setForumData] = useState({ title: "", description: "", image: "" });
  const [editData, setEditData] = useState({ title: "", description: "", image: "" });
  const [replyContent, setReplyContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { accessToken } = useSelector((state) => state.auth);
  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileQuery();
  const currentUsername = profileData?.username || "unknown";
  const profileUser = profileData?.image || "Image";
  const { data: forumsData, isLoading: forumsLoading, refetch: refetchForums } = useGetAllForumsQuery();
  const [createForum] = useCreateForumMutation();
  const [updateForum] = useUpdateForumMutation();
  const [deleteForum] = useDeleteForumMutation();
  const [replyToForum] = useReplyToForumMutation();

  const forums = [...(forumsData?.results || forumsData || [])].sort((a, b) =>
    new Date(b.created_at) - new Date(a.created_at)
  );

  const primaryColor = "#16789e";
  const primaryColorDark = "#106080";

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateForum = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setErrorMessage("Please log in to create a forum.");
      return;
    }
    try {
      await createForum(forumData).unwrap();
      setForumData({ title: "", description: "", image: "" });
      setShowCreateForm(false);
      refetchForums();
    } catch (error) {
      setErrorMessage("Failed to create forum: " + (error.data?.detail || "Unknown error"));
    }
  };

  const handleUpdateForum = async (e, id) => {
    e.preventDefault();
    if (!accessToken) {
      setErrorMessage("Please log in to update a forum.");
      return;
    }
    try {
      await updateForum({ id, ...editData }).unwrap();
      setShowEditForm(null);
      refetchForums();
    } catch (error) {
      setErrorMessage("Failed to update forum: " + (error.data?.detail || "Unknown error"));
    }
  };

  const handleDeleteForum = async (id) => {
    if (!accessToken) {
      setErrorMessage("Please log in to delete a forum.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this forum?")) {
      try {
        await deleteForum(id).unwrap();
        refetchForums();
      } catch (error) {
        setErrorMessage("Failed to delete forum: " + (error.data?.detail || "Unknown error"));
      }
    }
  };

  const handleReply = async (forumId) => {
    if (!accessToken) {
      setErrorMessage("Please log in to post a comment.");
      return;
    }
    if (!replyContent.trim()) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }
    try {
      await replyToForum({ forum_id: forumId, content: replyContent }).unwrap();
      setReplyContent("");
      setShowReplyForm(null);
      setErrorMessage("");
      refetchForums();
    } catch (error) {
      setErrorMessage("Failed to post comment: " + (error.data?.detail || "Unknown error"));
    }
  };

  const resetToCourses = () => {
    navigate("/forums");
  };

  if (profileLoading || forumsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <FaSpinner className="animate-spin text-primary h-10 w-10 sm:h-12 sm:w-12 mb-4" />
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          កំពុងផ្ទុកវេទិកា...
        </p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full">
          <h2 className="text-red-600 font-bold text-base sm:text-lg mb-2">មានបញ្ហាកើតឡើង</h2>
          <p className="text-red-500 text-sm sm:text-base">
            {profileError?.data?.message || profileError?.message || "មិនអាចទាញយកវេទិកាបានទេ"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm sm:text-base transition-all w-full sm:w-auto"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              ចែករំលែកចំណោះដឹង
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ស្វែងរកវេទិកា..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base shadow-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-white shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <FiPlus className="mr-2" /> បង្កើតវេទិកា
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base shadow-md">
            {errorMessage}
          </div>
        )}

        {/* Create Forum Form */}
        <AnimatePresence>
          {showCreateForm && (
            <ForumForm
              formData={forumData}
              setFormData={setForumData}
              onSubmit={handleCreateForum}
              onCancel={() => setShowCreateForm(false)}
              submitText="Create"
              primaryColor={primaryColor}
            />
          )}
        </AnimatePresence>

        {/* Forum List */}
        <div className="mt-8">
          {filteredForums.length > 0 ? (
            <div className="grid gap-6">
              {filteredForums.map((forum) => (
                <ForumCard
                  key={forum.id}
                  forum={forum}
                  currentUsername={currentUsername}
                  profileUser={profileUser}
                  accessToken={accessToken}
                  primaryColor={primaryColor}
                  primaryColorDark={primaryColorDark}
                  showEditForm={showEditForm}
                  setShowEditForm={setShowEditForm}
                  editData={editData}
                  setEditData={setEditData}
                  showReplyForm={showReplyForm}
                  setShowReplyForm={setShowReplyForm}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  handleUpdateForum={handleUpdateForum}
                  handleDeleteForum={handleDeleteForum}
                  handleReply={handleReply}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-10 text-center"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                មិនមានវេទិកាដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ
              </h3>
              <p className="text-gray-500 mb-4">វេទិកានេះមិនទាន់មានទេ</p>
              <button
                onClick={() => window.location.reload(resetToCourses)}
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md"
              >
                ត្រលប់ទៅវវេទិកាទាំងអស់
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForumPage;