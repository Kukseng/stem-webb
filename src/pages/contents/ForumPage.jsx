import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateForumMutation,
  useGetAllForumsQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useReplyToForumMutation,
} from "../../api/forums-api";
import { useGetProfileQuery } from "../../api/auth-api";
import ForumCard from "../../components/coursees/forum/ForumCard.jsx";
import ForumForm from "../../components/coursees/forum/ForumForm";
import SkeletonForumCard from "../../components/coursees/forum/SkeletonForumCard.jsx"; // New import
import { FiSearch, FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext.jsx";

const designSystem = {
  colors: {
    primary: "#16789e",
    primaryDark: "#0d5c7a",
    secondary: "#F3F4F6",
    accent: "#FBBF24",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    error: "#EF4444",
    success: "#10B981",
    cardBg: "#FFFFFF",
    cardShadow: "rgba(0, 0, 0, 0.05)",
  },
  typography: {
    heading: "text-xl md:text-2xl font-bold text-gray-900",
    subheading: "text-sm md:text-base text-gray-600",
    body: "text-base text-gray-700",
    caption: "text-sm text-gray-500",
    button: "text-sm font-medium text-white",
  },
  spacing: {
    xs: "p-2",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  },
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },
  borderRadius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const ForumPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", image: "" });
  const [forumData, setForumData] = useState({ title: "", description: "", image: "" });
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { accessToken } = useSelector((state) => state.auth);
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const currentUsername = profileData?.username || "មិនស្គាល់";
  const profileUser = profileData?.image || "https://via.placeholder.com/40";
  const { data: forumsData, isLoading: forumsLoading, refetch: refetchForums } = useGetAllForumsQuery();

  const forums = [...(forumsData?.results || forumsData || [])].sort((a, b) =>
    new Date(b.created_at) - new Date(a.created_at)
  );

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [createForum] = useCreateForumMutation();
  const [updateForum] = useUpdateForumMutation();
  const [deleteForum] = useDeleteForumMutation();
  const [replyToForum] = useReplyToForumMutation();

  const handleCreateForum = async (e) => {
    e.preventDefault();
    if (!user || !accessToken) {
      setErrorMessage("សូមចូលគណនីដើម្បីបង្កើតវេទិកា។");
      navigate("/login");
      return;
    }
    try {
      await createForum(forumData).unwrap();
      setForumData({ title: "", description: "", image: "" });
      setShowCreateForm(false);
      refetchForums();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.data?.detail || "បរាជ័យក្នុងការបង្កើតវេទិកា");
    }
  };

  const handleUpdateForum = async (e, id) => {
    e.preventDefault();
    if (!user || !accessToken) {
      setErrorMessage("សូមចូលគណនីដើម្បីកែសម្រួលវេទិកា។");
      navigate("/login");
      return;
    }
    try {
      await updateForum({ id, ...editData }).unwrap();
      setShowEditForm(null);
      refetchForums();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.data?.detail || "បរាជ័យក្នុងការកែសម្រួលវេទិកា");
    }
  };

  const handleDeleteForum = async (id) => {
    if (!user || !accessToken) {
      setErrorMessage("សូមចូលគណនីដើម្បីលុបវេទិកា។");
      navigate("/login");
      return;
    }
    try {
      await deleteForum(id).unwrap();
      setShowDeleteConfirm(null);
      refetchForums();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.data?.detail || "បរាជ័យក្នុងការលុបវេទិកា");
    }
  };

  const handleReply = async (forumId, content = replyContent, parentId = null) => {
    if (!user || !accessToken) {
      setErrorMessage("សូមចូលគណនីដើម្បីបញ្ចេញមតិ។");
      navigate("/login");
      return;
    }
    if (!content || !content.trim()) {
      setErrorMessage("មតិមិនអាចទទេបានទេ។");
      return;
    }
    try {
      await replyToForum({ forum_id: forumId, content, parent_id: parentId }).unwrap();
      setReplyContent("");
      setShowReplyForm(null);
      setErrorMessage("");
      refetchForums();
    } catch (error) {
      setErrorMessage(error.data?.detail || "បរាជ័យក្នុងការបញ្ចេញមតិ");
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (showCreateForm) setShowCreateForm(false);
        if (showEditForm) setShowEditForm(null);
        if (showDeleteConfirm) setShowDeleteConfirm(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showCreateForm, showEditForm, showDeleteConfirm]);

  if (profileLoading || forumsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Render multiple skeleton cards */}
          {Array(3).fill(0).map((_, index) => (
            <SkeletonForumCard key={index} />
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-0">
              ចែករំលែកការយល់ដឹង
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ស្វែងរកវេទិកា..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-sm shadow-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center shadow-md"
            >
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage("")} className="text-red-700 hover:text-red-900">
                <FiX size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-6">
          {filteredForums.length > 0 ? (
            filteredForums.map((forum) => (
              <ForumCard
                key={forum.id}
                forum={forum}
                currentUsername={currentUsername}
                profileUser={profileUser}
                accessToken={accessToken}
                primaryColor={designSystem.colors.primary}
                onEdit={() => {
                  setEditData({ title: forum.title, description: forum.description, image: forum.image || "" });
                  setShowEditForm(forum.id);
                }}
                onDelete={() => setShowDeleteConfirm(forum.id)}
                showReplyForm={showReplyForm}
                setShowReplyForm={setShowReplyForm}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleReply={handleReply}
                handleShare={() => alert("មុខងារចែករំលែកនឹងមានឆាប់ៗនេះ!")}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-10 text-center"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                មិនមានវេទិកាដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ
              </h3>
              <p className="text-gray-500 mb-4">សូមលៃតម្រូវការស្វែងរក ឬបង្កើតវេទិកាថ្មី</p>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
              >
                លុបការស្វែងរក
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {user && accessToken && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateForm(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-20"
        >
          <FiPlus size={24} />
        </motion.button>
      )}

      {/* Create Forum Modal */}
      <AnimatePresence>
        {showCreateForm && user && accessToken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-8 w-full max-w-3xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">បង្កើតវេទិកាថ្មី</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <ForumForm
                formData={forumData}
                setFormData={setForumData}
                onSubmit={handleCreateForum}
                onCancel={() => setShowCreateForm(false)}
                submitText="បង្កើត"
                primaryColor={designSystem.colors.primary}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Forum Modal */}
      <AnimatePresence>
        {showEditForm && user && accessToken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditForm(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-8 w-full max-w-3xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">កែសម្រួលវេទិកា</h2>
                <button
                  onClick={() => setShowEditForm(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <ForumForm
                formData={editData}
                setFormData={setEditData}
                onSubmit={(e) => handleUpdateForum(e, showEditForm)}
                onCancel={() => setShowEditForm(null)}
                submitText="ធ្វើបច្ចុប្បន្នភាព"
                primaryColor={designSystem.colors.primary}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">បញ្ជាក់ការលុប</h2>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              <p className="text-gray-700 mb-6">
                តើអ្នកប្រាកដជាចង់លុបវេទិកា "<strong>{forums.find(f => f.id === showDeleteConfirm)?.title}</strong>" នេះឬ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all shadow-sm"
                >
                  បោះបង់
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteForum(showDeleteConfirm)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition-all"
                >
                  លុប
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForumPage;