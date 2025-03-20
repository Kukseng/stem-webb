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
import SkeletonForumCard from "../../components/coursees/forum/SkeletonForumCard.jsx";
import { FiSearch, FiPlus, FiX, FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext.jsx";

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
  const [viewMode, setViewMode] = useState("grid");

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
      setErrorMessage("សូមចូលគណនីដើម្បីបញ្ចេញមតិ១");
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

  const handleForumClick = (forumId) => {
    navigate(`/forum/${forumId}`);
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {Array(3).fill(0).map((_, index) => (
              <SkeletonForumCard key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl md:text-4xl font-medium text-[#16789e]">
                ចែករំលែកការយល់ដឹង
              </h1>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ស្វែងរកវេទិកា..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-base shadow-sm"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    <FiGrid size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    <FiList size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center shadow-md"
              >
                <span className="text-base md:text-lg text-red-700 leading-relaxed">{errorMessage}</span>
                <button onClick={() => setErrorMessage("")} className="text-red-700 hover:text-red-900">
                  <FiX size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredForums.length > 0 ? (
              filteredForums.map((forum) => (
                <ForumCard
                  key={forum.id}
                  forum={forum}
                  currentUsername={currentUsername}
                  profileUser={profileUser}
                  accessToken={accessToken}
                  primaryColor="#16789e" // Direct color value
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
                  viewMode={viewMode}
                  onForumClick={handleForumClick}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-md p-10 text-center col-span-full"
              >
                <h3 className="text-3xl md:text-4xl font-medium text-gray-900">
                  មិនមានវេទិកាដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">
                  សូមលៃតម្រូវការស្វែងរក ឬបង្កើតវេទិកាថ្មី
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                >
                  លុបការស្វែងរក
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {user && accessToken && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateForm(true)}
          className="fixed bottom-6 right-6 bg-[#16789e] text-white p-4 rounded-full shadow-md z-20"
        >
          <FiPlus size={24} />
        </motion.button>
      )}

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
              className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900">បង្កើតវេទិកាថ្មី</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                >
                  <FiX size={32} />
                </motion.button>
              </div>
              <ForumForm
                formData={forumData}
                setFormData={setForumData}
                onSubmit={handleCreateForum}
                onCancel={() => setShowCreateForm(false)}
                submitText="បង្កើត"
                primaryColor="#16789e" // Direct color value
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900">កែសម្រួលវេទិកា</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditForm(null)}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                >
                  <FiX size={32} />
                </motion.button>
              </div>
              <ForumForm
                formData={editData}
                setFormData={setEditData}
                onSubmit={(e) => handleUpdateForum(e, showEditForm)}
                onCancel={() => setShowEditForm(null)}
                submitText="ធ្វើបច្ចុប្បន្នភាព"
                primaryColor="#16789e" // Direct color value
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900">បញ្ជាក់ការលុប</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                >
                  <FiX size={28} />
                </motion.button>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                តើអ្នកប្រាកដជាចង់លុបវេទិកា "<strong>{forums.find(f => f.id === showDeleteConfirm)?.title}</strong>" នេះឬ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-300 ease-in-out"
                >
                  បោះបង់
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteForum(showDeleteConfirm)}
                  className="px-4 py-2 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out"
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