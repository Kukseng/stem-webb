import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiMessageSquare,
  FiCornerDownRight,
  FiHeart,
  FiShare2,
  FiX,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import ForumForm from "./ForumForm";
import { AuthContext } from "../../../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetTotalFollowersQuery,
} from "../../../api/follow-api.js";

const designSystem = {
  colors: {
    primary: "#4F46E5",
    primaryDark: "#4338CA",
    secondary: "#F3F4F6",
    accent: "#FBBF24",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    error: "#EF4444",
    success: "#10B981",
    cardBg: "#FFFFFF",
    cardShadow: "rgba(0, 0, 0, 0.05)",
    gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)",
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
    neumorphic: "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(255, 255, 255, 0.9)",
  },
  borderRadius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
  },
};

const ForumCard = ({
  forum,
  currentUsername,
  profileUser,
  accessToken,
  primaryColor = designSystem.colors.primary,
  showEditForm,
  setShowEditForm,
  editData,
  setEditData,
  showReplyForm,
  setShowReplyForm,
  replyContent,
  setReplyContent,
  handleUpdateForum,
  handleDeleteForum,
  handleReply,
  handleShare,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const forumComments = forum.comments || [];
  const isAuthor = currentUsername === forum.author;

  const [visibleComments, setVisibleComments] = useState(3);
  const [showComments, setShowComments] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [nestedReplyContent, setNestedReplyContent] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [followError, setFollowError] = useState("");

  const commentsRef = useRef(null);
  const defaultProfileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&s";

  const authorId = forum.author_id || forum.author?.id || forum.user_id || null;

  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] = useUnfollowUserMutation();
  const { data: followersData, isLoading: isFollowersLoading } = useGetTotalFollowersQuery(
    authorId,
    { skip: !authorId || !accessToken }
  );

  const totalFollowers = followersData?.total_followers || 0;
  const followers = followersData?.followers || [];
  const isFollowingUser = followers.some((follower) => follower.username === currentUsername);

  const handleFollow = async () => {
    if (!user || !accessToken) {
      navigate("/login");
      return;
    }
    if (!authorId) {
      setFollowError("អត្តសញ្ញាណអ្នកនិពន្ធបាត់");
      return;
    }
    try {
      await followUser(authorId).unwrap();
      setFollowError("");
    } catch (error) {
      setFollowError(error.data?.detail || "បរាជ័យក្នុងការតាមដានអ្នកប្រើប្រាស់");
    }
  };

  const handleUnfollow = async () => {
    if (!user || !accessToken) {
      navigate("/login");
      return;
    }
    if (!authorId) {
      setFollowError("អត្តសញ្ញាណអ្នកនិពន្ធបាត់");
      return;
    }
    try {
      await unfollowUser(authorId).unwrap();
      setFollowError("");
    } catch (error) {
      setFollowError(error.data?.detail || "បរាជ័យក្នុងការឈប់តាមដានអ្នកប្រើប្រាស់");
    }
  };

  const handleShowMoreComments = () => setVisibleComments((prev) => prev + 5);

  const handleNestedReply = (parentCommentId) => {
    if (!user || !accessToken) return navigate("/login");
    if (!nestedReplyContent.trim()) return;
    handleReply(forum.id, nestedReplyContent, parentCommentId);
    setNestedReplyContent("");
    setActiveComment(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showComments && commentsRef.current && !commentsRef.current.contains(event.target)) {
        setShowComments(false);
        setVisibleComments(3);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showComments]);

  const renderNestedComments = (comments, parentId = null, level = 0) => {
    const filteredComments = comments.filter(
      (comment) => (comment.parentId ?? null) === parentId
    );

    return filteredComments.map((comment) => (
      <div key={comment.id} className={`ml-${level * 4} mt-4`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start space-x-3"
        >
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            src={comment.profile_image || defaultProfileImage}
            alt={comment.author}
            onError={(e) => (e.target.src = defaultProfileImage)}
          />
          <div className="flex-1">
            <div className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
            <div className="flex mt-2 space-x-4 text-xs text-gray-600">
              <button className="flex items-center hover:text-red-500 transition-colors">
                <FiHeart size={14} className="mr-1" /> ចូលចិត្ត
              </button>
              <button
                className="flex items-center hover:text-blue-600 transition-colors"
                onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
              >
                <FiMessageSquare size={14} className="mr-1" /> ឆ្លើយតប
              </button>
            </div>
            <AnimatePresence>
              {activeComment === comment.id && user && accessToken && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 ml-6 flex items-start space-x-2"
                >
                  <FiCornerDownRight className="text-gray-400 mt-2" size={14} />
                  <div className="flex-1">
                    <textarea
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                      placeholder={`ឆ្លើយតបទៅ ${comment.author}...`}
                      value={nestedReplyContent}
                      onChange={(e) => setNestedReplyContent(e.target.value)}
                      rows={2}
                    />
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => setActiveComment(null)}
                      >
                        បោះបង់
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNestedReply(comment.id)}
                        className="px-3 py-1 text-sm font-medium text-white rounded-md shadow-sm"
                        style={{ backgroundColor: nestedReplyContent.trim() ? primaryColor : "#d1d5db" }}
                        disabled={!nestedReplyContent.trim()}
                      >
                        ឆ្លើយតប
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        {renderNestedComments(comments, comment.id, level + 1)}
      </div>
    ));
  };

  return (
    <motion.div
      key={forum.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: designSystem.shadows.neumorphic }}
      className="p-6 bg-white rounded-lg shadow-md border border-gray-100 mb-6 w-full"
    >
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
          src={forum.profileUser || defaultProfileImage}
          alt={forum.author}
          onError={(e) => (e.target.src = defaultProfileImage)}
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-base text-gray-900">{forum.author}</p>
              <p className="text-xs text-gray-500">
                {new Date(forum.created_at).toLocaleDateString()} •{" "}
                {isFollowersLoading ? "..." : `${totalFollowers} អ្នកតាមដាន`}
              </p>
            </div>
            {!isAuthor && user && accessToken && authorId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isFollowingUser ? handleUnfollow : handleFollow}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white shadow-md ${
                  isFollowing || isUnfollowing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ backgroundColor: primaryColor }}
                disabled={isFollowing || isUnfollowing}
              >
                {isFollowingUser ? (
                  <>
                    <FiUserMinus className="inline mr-1" size={14} /> ឈប់តាម
                  </>
                ) : (
                  <>
                    <FiUserPlus className="inline mr-1" size={14} /> តាមដាន
                  </>
                )}
              </motion.button>
            )}
          </div>
          {followError && (
            <p className="text-red-600 text-xs mt-1">{followError}</p>
          )}
        </div>
        {isAuthor && (
          <div className="ml-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-blue-600"
              onClick={() => {
                setEditData({ title: forum.title, description: forum.description, image: forum.image || "" });
                setShowEditForm(forum.id);
              }}
            >
              <FiEdit size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-red-600"
              onClick={() => handleDeleteForum(forum.id)}
            >
              <FiTrash2 size={18} />
            </motion.button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          {forum.image && (
            <img
              className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer"
              src={forum.image}
              alt={forum.title}
              onError={(e) => (e.target.src = defaultProfileImage)}
              onClick={() => setShowImageModal(true)}
            />
          )}
          <div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>
              {forum.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">{forum.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-gray-200">
        <div className="flex space-x-6">
          <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors text-sm">
            <FiHeart size={16} className="mr-1" /> ចូលចិត្ត
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
            onClick={() => setShowComments(!showComments)}
          >
            <FiMessageSquare size={16} className="mr-1" /> មតិ ({forumComments.length})
          </button>
          <button
            onClick={handleShare}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            <FiShare2 size={16} className="mr-1" /> ចែករំលែក
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            ref={commentsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            {user && accessToken ? (
              <div className="flex items-start space-x-3 mb-6">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  src={profileUser || defaultProfileImage}
                  alt={currentUsername}
                  onError={(e) => (e.target.src = defaultProfileImage)}
                />
                <div className="flex-1">
                  <textarea
                    rows={2}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    placeholder="សរសេរមតិ..."
                    value={showReplyForm === forum.id ? replyContent : ""}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onClick={() => setShowReplyForm(forum.id)}
                  />
                  {showReplyForm === forum.id && (
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => setShowReplyForm(null)}
                      >
                        បោះបង់
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReply(forum.id, replyContent)}
                        className="px-4 py-1 text-sm font-medium text-white rounded-md shadow-sm"
                        style={{ backgroundColor: replyContent.trim() ? primaryColor : "#d1d5db" }}
                        disabled={!replyContent.trim()}
                      >
                        បញ្ចេញ
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 text-center mb-6">
                <a href="/login" className="text-blue-600 hover:underline">ចូលគណនី</a> ដើម្បីបញ្ចេញមតិ
              </p>
            )}

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {renderNestedComments(forumComments.slice(0, visibleComments))}
            </div>

            {forumComments.length > visibleComments && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleShowMoreComments}
                  className="text-sm font-medium hover:underline"
                  style={{ color: primaryColor }}
                >
                  ផ្ទុកមតិបន្ថែម
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditForm === forum.id && isAuthor && user && accessToken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowEditForm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">កែសម្រួលប្រកាស</h2>
                <button
                  onClick={() => setShowEditForm(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              <ForumForm
                formData={editData}
                setFormData={setEditData}
                onSubmit={(e) => {
                  handleUpdateForum(e, forum.id);
                  setShowEditForm(null);
                }}
                onCancel={() => setShowEditForm(null)}
                submitText="ធ្វើបច្ចុប្បន្នភាព"
                primaryColor={primaryColor}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showImageModal && forum.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative max-w-4xl w-full p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                onClick={() => setShowImageModal(false)}
              >
                <FiX size={24} />
              </button>
              <img
                className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
                src={forum.image}
                alt={forum.title}
                onError={(e) => (e.target.src = defaultProfileImage)}
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForumCard;