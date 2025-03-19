import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiMessageSquare,
  FiCornerDownRight,
  FiHeart,
  FiShare2,
  FiUserPlus,
  FiUserMinus,
  FiBookmark,
  FiCheckCircle,
  FiX,
  FiThumbsUp,
  FiPaperclip,
  FiTag,
  FiBook,
  FiLink,
} from "react-icons/fi";
import { AuthContext } from "../../../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetTotalFollowersQuery,
} from "../../../api/follow-api.js";

const designSystem = {
  colors: {
    primary: "#16789e",
    primaryLight: "#2389b3",
    primaryDark: "#0d5c7a",
    secondary: "#F3F4F6",
    accent: "#FBBF24",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    error: "#EF4444",
    success: "#10B981",
    cardBg: "#FFFFFF",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    gradient: "linear-gradient(135deg, #16789e, #2389b3)",
    educationTag: "#e5f3f8",
    educationTagText: "#16789e",
    verifiedBadge: "#10B981",
  },
  typography: {
    heading: "text-xl md:text-2xl font-semibold text-gray-900",
    subheading: "text-sm md:text-base text-gray-600",
    body: "text-base text-gray-700 leading-relaxed",
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
    neumorphic: "0 4px 8px rgba(0, 0, 0, 0.08), 0 -2px 4px rgba(255, 255, 255, 0.15)",
  },
  borderRadius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.01, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)" },
};

const commentVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.25 },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.15)" },
  tap: { scale: 0.97 },
};

const tagVariants = {
  hover: { scale: 1.03, y: -2 },
};

const ForumCard = ({
  forum,
  currentUsername,
  profileUser,
  accessToken,
  primaryColor = designSystem.colors.primary,
  onEdit,
  onDelete,
  showReplyForm,
  setShowReplyForm,
  replyContent,
  setReplyContent,
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
  const [followError, setFollowError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(forum.helpful_count || 0);
  const [isHelpful, setIsHelpful] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const educationTags = forum.education_tags || ["ចំណេះទូទៅ"];
  const isVerified = forum.is_verified || false;
  const difficultyLevel = forum.difficulty_level || "មធ្យម";
  const resourceLinks = forum.resource_links || [
    { title: "ឯកសារបន្ថែម", url: "#" },
    { title: "វីដេអូពន្យល់", url: "#" },
  ];

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

  const handleSaveForum = () => {
    if (!user || !accessToken) return navigate("/login");
    setIsSaved(!isSaved);
  };

  const handleHelpfulForum = () => {
    if (!user || !accessToken) return navigate("/login");
    if (!isHelpful) {
      setHelpfulCount((prev) => prev + 1);
    } else {
      setHelpfulCount((prev) => Math.max(0, prev - 1));
    }
    setIsHelpful(!isHelpful);
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

    return filteredComments.map((comment, index) => (
      <motion.div
        key={comment.id}
        custom={index}
        variants={commentVariants}
        initial="hidden"
        animate="visible"
        className={`ml-${level * 4} mt-4`}
      >
        <div className="flex items-start space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            src={comment.profile_image || defaultProfileImage}
            alt={comment.author}
            onError={(e) => (e.target.src = defaultProfileImage)}
          />
          <div className="flex-1">
            <div className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                  {comment.is_teacher && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                      គ្រូ
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
            <div className="flex mt-2 space-x-4 text-xs text-gray-600">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center hover:text-red-500 transition-colors"
              >
                <FiHeart size={14} className="mr-1" /> ចូលចិត្ត
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center hover:text-blue-600 transition-colors"
                onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
              >
                <FiMessageSquare size={14} className="mr-1" /> ឆ្លើយតប
              </motion.button>
              {comment.is_solution && (
                <span className="flex items-center text-green-600">
                  <FiCheckCircle size={14} className="mr-1" /> ដំណោះស្រាយត្រឹមត្រូវ
                </span>
              )}
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
        </div>
        {renderNestedComments(comments, comment.id, level + 1)}
      </motion.div>
    ));
  };

  return (
    <motion.div
      key={forum.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mb-8 w-full transition-all duration-300"
      style={{ background: "linear-gradient(145deg, #ffffff, #f9fafb)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 shadow-md"
            src={forum.profileUser || defaultProfileImage}
            alt={forum.author}
            onError={(e) => (e.target.src = defaultProfileImage)}
          />
          <div className="ml-4">
            <div className="flex items-center">
              <p className="font-semibold text-lg text-gray-900">{forum.author}</p>
              {isVerified && (
                <FiCheckCircle className="ml-2 text-green-600" size={16} title="ផ្ទៀងផ្ទាត់" />
              )}
            </div>
            <p className="text-sm text-gray-500">
              {new Date(forum.created_at).toLocaleDateString()} •{" "}
              {isFollowersLoading ? "..." : `${totalFollowers} អ្នកតាមដាន`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isAuthor && user && accessToken && authorId && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={isFollowingUser ? handleUnfollow : handleFollow}
              className={`px-4 py-2 rounded-full text-sm font-medium text-white shadow-md transition-all ${
                isFollowing || isUnfollowing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ background: designSystem.colors.gradient }}
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
          {isAuthor && (
            <div className="flex space-x-3">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                onClick={onEdit}
              >
                <FiEdit size={20} />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-gray-500 hover:text-red-600 transition-colors"
                onClick={onDelete}
              >
                <FiTrash2 size={20} />
              </motion.button>
            </div>
          )}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`text-gray-500 transition-colors ${isSaved ? "text-blue-600" : "hover:text-blue-600"}`}
            onClick={handleSaveForum}
          >
            <FiBookmark size={20} />
          </motion.button>
        </div>
      </div>

      {followError && (
        <p className="text-red-600 text-xs mb-4">{followError}</p>
      )}

      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          {forum.image && (
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-96 object-cover rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              src={forum.image}
              alt={forum.title}
              onError={(e) => (e.target.src = defaultProfileImage)}
            />
          )}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                {forum.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  {difficultyLevel}
                </span>
                {isVerified && (
                  <span className="flex items-center text-green-600 text-xs">
                    <FiCheckCircle className="mr-1" size={14} /> ផ្ទៀងផ្ទាត់
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {educationTags.map((tag, index) => (
                <motion.div
                  key={index}
                  variants={tagVariants}
                  whileHover="hover"
                  className="px-3 py-1 text-sm font-medium rounded-full shadow-sm cursor-pointer transition-colors"
                  style={{
                    backgroundColor: designSystem.colors.educationTag,
                    color: designSystem.colors.educationTagText,
                  }}
                >
                  <FiTag className="inline mr-1" size={14} /> {tag}
                </motion.div>
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed">{forum.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-gray-200">
        <div className="flex space-x-6">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
            onClick={() => setShowComments(!showComments)}
          >
            <FiMessageSquare size={18} className="mr-1" /> មតិ ({forumComments.length})
          </motion.button>
        
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
            onClick={handleShare}
          >
            <FiShare2 size={18} className="mr-1" /> ចែករំលែក
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
            onClick={() => setShowResources(!showResources)}
          >
            <FiPaperclip size={18} className="mr-1" /> ឯកសារយោង
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showResources && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <FiBook className="mr-2" size={16} /> ឯកសារយោងសម្រាប់ការសិក្សា
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center"
                  >
                    <FiLink className="mr-2" size={14} /> {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

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
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
                    placeholder="សរសេរមតិ..."
                    value={showReplyForm === forum.id ? replyContent : ""}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onClick={() => setShowReplyForm(forum.id)}
                  />
                  {showReplyForm === forum.id && (
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={() => setShowReplyForm(null)}
                      >
                        បោះបង់
                      </button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleReply(forum.id, replyContent)}
                        className="px-4 py-1 text-sm font-medium text-white rounded-md shadow-md"
                        style={{ background: replyContent.trim() ? designSystem.colors.gradient : "#d1d5db" }}
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
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  onClick={handleShowMoreComments}
                  className="text-sm font-medium hover:underline"
                  style={{ color: primaryColor }}
                >
                  ផ្ទុកមតិបន្ថែម
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForumCard;