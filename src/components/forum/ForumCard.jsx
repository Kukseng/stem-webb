import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiMessageSquare,
  FiCornerDownRight,
  FiMoreHorizontal,
  FiHeart,
  FiShare2,
  FiX,
} from "react-icons/fi";
import ForumForm from "./ForumForm";

const ForumCard = ({
  forum,
  currentUsername,
  profileUser, // Current user's profile image
  accessToken,
  primaryColor = "#2563EB",
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
}) => {
  const forumComments = forum.comments || [];
  const isAuthor = currentUsername === forum.author;

  const [visibleComments, setVisibleComments] = useState(3);
  const [showComments, setShowComments] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [nestedReplyContent, setNestedReplyContent] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const commentsRef = useRef(null);

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  const handleNestedReply = (parentCommentId) => {
    if (!nestedReplyContent.trim()) return;
    console.log(`Replying to comment ${parentCommentId} with: ${nestedReplyContent}`);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComments]);

  const renderNestedComments = (comments, parentId = null, level = 0) => {
    const filteredComments = comments.filter(
      (comment) => (comment.parentId === undefined ? null : comment.parentId) === parentId
    );

    if (filteredComments.length === 0) return null;

    return filteredComments.map((comment) => {
      // Use profileUser for the current user's comments, otherwise fall back to comment.profileImage
      const commentProfileImage =
        comment.author === currentUsername ? profileUser : comment.profileImage || "";

      return (
        <div key={comment.id} className={`ml-${level * 4} sm:ml-${level * 6} mt-4`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3"
          >
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0 shadow-sm"
              src={commentProfileImage}
              alt={comment.author}
              onError={(e) => (e.target.src = "")}
            />
            <div className="flex-1">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1 sm:mt-0">
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
              </div>
              <div className="flex mt-2 ml-1 text-xs text-gray-500 space-x-4">
                <button className="flex items-center hover:text-blue-600">
                  <FiHeart className="mr-1" size={14} /> Like
                </button>
                <button
                  className="flex items-center hover:text-blue-600"
                  onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
                >
                  <FiMessageSquare className="mr-1" size={14} /> Reply
                </button>
              </div>

              <AnimatePresence>
                {activeComment === comment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 ml-6 flex items-start space-x-2"
                  >
                    <FiCornerDownRight className="text-gray-400 mt-2" size={14} />
                    <div className="flex-1">
                      <textarea
                        className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
                        placeholder={`Reply to ${comment.author}...`}
                        value={nestedReplyContent}
                        onChange={(e) => setNestedReplyContent(e.target.value)}
                        rows={2}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          onClick={() => setActiveComment(null)}
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleNestedReply(comment.id)}
                          className="px-3 py-1 rounded-md text-sm font-medium text-white disabled:bg-gray-400 shadow-md"
                          style={{ backgroundColor: nestedReplyContent.trim() ? primaryColor : "#d1d5db" }}
                          disabled={!nestedReplyContent.trim()}
                        >
                          Reply
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
      );
    });
  };

  return (
    <motion.div
      key={forum.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-6 w-full max-w-2xl mx-auto"
    >
      {/* Header Section with Author Info */}
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0 shadow-sm"
          src={forum.profileUser || ""}
          alt={forum.author}
          onError={(e) => (e.target.src = "")}
        />
        <div className="ml-3">
          <p className="font-semibold text-base text-gray-800">{forum.author}</p>
          <p className="text-xs text-gray-500">{new Date(forum.created_at).toLocaleDateString()}</p>
        </div>
        {isAuthor && (
          <div className="ml-auto flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-blue-600 p-2"
              onClick={() => {
                setEditData({
                  title: forum.title,
                  description: forum.description,
                  image: forum.image || "",
                });
                setShowEditForm(forum.id);
              }}
            >
              <FiEdit size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-red-600 p-2"
              onClick={() => handleDeleteForum(forum.id)}
            >
              <FiTrash2 size={16} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {forum.image && (
            <img
              className="h-24 w-24 rounded-lg object-cover border border-gray-200 cursor-pointer mb-2 sm:mb-0 shadow-sm"
              src={forum.image}
              alt={forum.title}
              onError={(e) => (e.target.src = "")}
              onClick={() => setShowImageModal(true)}
            />
          )}
          <div className="flex-1">
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: primaryColor }}
            >
              {forum.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">{forum.description}</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-t border-b border-gray-200 space-y-2 sm:space-y-0">
        <div className="flex space-x-6 w-full sm:w-auto">
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
            <FiHeart className="mr-1" size={14} />
            <span>Like</span>
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
            onClick={() => {
              setShowComments(!showComments);
              if (!showComments) setVisibleComments(3);
            }}
          >
            <FiMessageSquare className="mr-1" size={14} />
            <span>Comments ({forumComments.length})</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
            <FiShare2 className="mr-1" size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <AnimatePresence>
        {showEditForm === forum.id && isAuthor && (
          <ForumForm
            formData={editData}
            setFormData={setEditData}
            onSubmit={(e) => handleUpdateForum(e, forum.id)}
            onCancel={() => setShowEditForm(null)}
            submitText="Update"
            primaryColor={primaryColor}
          />
        )}
      </AnimatePresence>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            ref={commentsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            {/* Comment Input */}
            {accessToken && (
              <div className="flex items-start space-x-3 mb-6">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0 shadow-sm"
                  src={profileUser || ""}
                  alt={currentUsername}
                  onError={(e) => (e.target.src = "")}
                />
                <div className="flex-1">
                  <textarea
                    rows={2}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none shadow-sm"
                    placeholder="Write a comment..."
                    value={showReplyForm === forum.id ? replyContent : ""}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onClick={() => setShowReplyForm(forum.id)}
                  />
                  {showReplyForm === forum.id && (
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => setShowReplyForm(null)}
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReply(forum.id)}
                        className="px-4 py-1 rounded-md text-sm font-medium text-white disabled:bg-gray-400 shadow-md"
                        style={{ backgroundColor: replyContent.trim() ? primaryColor : "#d1d5db" }}
                        disabled={!replyContent.trim()}
                      >
                        Post
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Display Comments */}
            <div className="space-y-4 max-h-96 overflow-y-auto rounded-lg">
              {renderNestedComments(forumComments.slice(0, visibleComments))}
            </div>

            {/* Load More Comments */}
            {forumComments.length > visibleComments && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleShowMoreComments}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  style={{ color: primaryColor }}
                >
                  Load More Comments
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && forum.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 sm:px-0"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 bg-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={() => setShowImageModal(false)}
              >
                <FiX size={24} />
              </button>
              <img
                className="w-full h-auto rounded-lg"
                src={forum.image}
                alt={forum.title}
                onError={(e) => (e.target.src = "")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForumCard;