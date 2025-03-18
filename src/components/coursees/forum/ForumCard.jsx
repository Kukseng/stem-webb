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
  FiPaperclip,
  FiTag,
} from "react-icons/fi";
import { AuthContext } from "../../../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetTotalFollowersQuery,
} from "../../../api/follow-api.js";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" },
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
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const tagVariants = {
  hover: { scale: 1.03, y: -2 },
};

const ForumCard = ({
  forum,
  currentUsername,
  profileUser,
  accessToken,
  primaryColor = "#16789e",
  onEdit,
  onDelete,
  showReplyForm,
  setShowReplyForm,
  replyContent,
  setReplyContent,
  handleReply,
  handleShare,
  viewMode,
  onForumClick,
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
        className={`ml-${level * 2} mt-2`}
      >
        <div className="flex items-start space-x-2">
          <img
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
            src={comment.profile_image || defaultProfileImage}
            alt={comment.author}
            onError={(e) => (e.target.src = defaultProfileImage)}
          />
          <div className="flex-1">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <p className="font-semibold text-xs text-gray-800">{comment.author}</p>
                  {comment.is_teacher && (
                    <span className="ml-1 px-1 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full">
                      គ្រូ
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-xs text-gray-700">{comment.content}</p>
            </div>
            <div className="flex mt-1 space-x-2 text-[10px] text-gray-600">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center hover:text-red-500 transition-colors"
              >
                <FiHeart size={12} className="mr-1" /> ចូលចិត្ត
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center hover:text-blue-600 transition-colors"
                onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
              >
                <FiMessageSquare size={12} className="mr-1" /> ឆ្លើយតប
              </motion.button>
              {comment.is_solution && (
                <span className="flex items-center text-green-600">
                  <FiCheckCircle size={12} className="mr-1" /> ដំណោះស្រាយត្រឹមត្រូវ
                </span>
              )}
            </div>
            <AnimatePresence>
              {activeComment === comment.id && user && accessToken && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 ml-4 flex items-start space-x-1"
                >
                  <FiCornerDownRight className="text-gray-400 mt-1" size={12} />
                  <div className="flex-1">
                    <textarea
                      className="w-full p-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                      placeholder={`ឆ្លើយតបទៅ ${comment.author}...`}
                      value={nestedReplyContent}
                      onChange={(e) => setNestedReplyContent(e.target.value)}
                      rows={2}
                    />
                    <div className="mt-1 flex justify-end space-x-1">
                      <button
                        className="text-xs text-gray-600 hover:text-gray-800"
                        onClick={() => setActiveComment(null)}
                      >
                        បោះបង់
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNestedReply(comment.id)}
                        className="px-2 py-0.5 text-xs font-medium text-white rounded-md"
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
      className={`p-4 bg-white rounded-lg border border-gray-200 transition-all duration-300 w-full`}
    >
    
      <div className="cursor-pointer" onClick={() => onForumClick(forum.id)}>
        <div className="flex flex-col items-start mb-4">
          <div className="flex items-center w-full space-x-2">
            <img
              className="h-10 w-10 rounded-full object-cover border border-gray-200"
              src={forum.profileUser || defaultProfileImage}
              alt={forum.author}
              onError={(e) => (e.target.src = defaultProfileImage)}
            />
            <div className="flex-1">
              <div className="flex items-center">
                <p className="font-semibold text-base text-gray-900">{forum.author}</p>
                {isVerified && (
                  <FiCheckCircle className="ml-1 text-green-600" size={14} title="ផ្ទៀងផ្ទាត់" />
                )}
              </div>
              <p className="text-xs text-gray-500">
                {new Date(forum.created_at).toLocaleDateString()} •{" "}
                {isFollowersLoading ? "..." : `${totalFollowers} អ្នកតាមដាន`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {!isAuthor && user && accessToken && authorId && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => {
                    e.stopPropagation();
                    isFollowingUser ? handleUnfollow() : handleFollow();
                  }}
                  className={`px-2 py-1 rounded-full text-xs font-medium text-white transition-all duration-300 ease-in-out ${
                    isFollowing || isUnfollowing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{ background: "linear-gradient(135deg, #16789e, #FF6B6B)" }}
                  disabled={isFollowing || isUnfollowing}
                >
                  {isFollowingUser ? (
                    <>
                      <FiUserMinus className="inline mr-1" size={12} /> ឈប់តាម
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="inline mr-1" size={12} /> តាមដាន
                    </>
                  )}
                </motion.button>
              )}
              {isAuthor && (
                <div className="flex space-x-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    <FiEdit size={16} />
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                </div>
              )}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`text-gray-500 transition-colors ${isSaved ? "text-blue-600" : "hover:text-blue-600"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveForum();
                }}
              >
                <FiBookmark size={16} />
              </motion.button>
            </div>
          </div>

          {followError && <p className="text-red-600 text-xs mt-2">{followError}</p>}

          <div className="mt-3 w-full">
            {forum.image && (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-40 object-cover rounded-md border border-gray-200"
                src={forum.image}
                alt={forum.title}
                onError={(e) => (e.target.src = defaultProfileImage)}
              />
            )}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{forum.title}</h3>
                <div className="flex items-center space-x-1">
                  <span className="px-1 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-full">
                    {difficultyLevel}
                  </span>
                  {isVerified && (
                    <span className="flex items-center text-green-600 text-[10px]">
                      <FiCheckCircle className="mr-1" size={12} /> ផ្ទៀងផ្ទាត់
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {educationTags.map((tag, index) => (
                  <motion.div
                    key={index}
                    variants={tagVariants}
                    whileHover="hover"
                    className="px-2 py-0.5 text-xs font-medium text-[#16789e] bg-gray-100 rounded-full cursor-pointer transition-colors"
                  >
                    <FiTag className="inline mr-1" size={12} /> {tag}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{forum.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-2 border-t border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-[16px"
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(!showComments);
            }}
          >
            <FiMessageSquare size={18} className="mr-1" /> មតិ ({forumComments.length})
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-[16px]"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <FiShare2 size={18} className="mr-1" /> ចែករំលែក
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-[16px]"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/forum/${forum.id}/resources`);
            }}
          >
            <FiPaperclip size={18} className="mr-1" /> ឯកសារយោង
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            ref={commentsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            {user && accessToken ? (
              <div className="flex items-start space-x-2 mb-4">
                <img
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  src={profileUser || defaultProfileImage}
                  alt={currentUsername}
                  onError={(e) => (e.target.src = defaultProfileImage)}
                />
                <div className="flex-1">
                  <textarea
                    rows={2}
                    className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="សរសេរមតិ..."
                    value={showReplyForm === forum.id ? replyContent : ""}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onClick={() => setShowReplyForm(forum.id)}
                  />
                  {showReplyForm === forum.id && (
                    <div className="mt-1 flex justify-end space-x-1">
                      <button
                        className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={() => setShowReplyForm(null)}
                      >
                        បោះបង់
                      </button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleReply(forum.id, replyContent)}
                        className="px-2 py-0.5 text-xs font-medium text-white rounded-md"
                        style={{ background: replyContent.trim() ? "linear-gradient(135deg, #16789e, #FF6B6B)" : "#d1d5db" }}
                        disabled={!replyContent.trim()}
                      >
                        បញ្ចេញ
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 text-center mb-4">
                <a href="/login" className="text-blue-600 hover:underline">ចូលគណនី</a> ដើម្បីបញ្ចេញមតិ
              </p>
            )}

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {renderNestedComments(forumComments.slice(0, visibleComments))}
            </div>

            {forumComments.length > visibleComments && (
              <div className="mt-2 text-center">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  onClick={handleShowMoreComments}
                  className="text-xs font-medium text-[#16789e] hover:underline"
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