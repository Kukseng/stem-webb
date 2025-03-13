import React, { useState } from "react";
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

  // New state for comment management
  const [visibleComments, setVisibleComments] = useState(3);
  const [showComments, setShowComments] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [nestedReplyContent, setNestedReplyContent] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  // Handle nested reply submission
  const handleNestedReply = (parentCommentId) => {
    if (!nestedReplyContent.trim()) return;
    // Here you would typically call an API to submit the nested reply
    console.log(`Replying to comment ${parentCommentId} with: ${nestedReplyContent}`);
    setNestedReplyContent("");
    setActiveComment(null);
  };

  // Render nested comments recursively
  const renderNestedComments = (comments, parentId = null, level = 0) => {
    const filteredComments = comments.filter((comment) =>
      (comment.parentId === undefined ? null : comment.parentId) === parentId
    );

    if (filteredComments.length === 0) return null;

    return filteredComments.map((comment) => (
      <div key={comment.id} className={`ml-${level * 4}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start space-x-3"
        >
          <img
            className="h-8 w-8 rounded-full mt-1 object-cover border border-gray-300"
            src={
              comment.profileImage || // Use the profile image from the comment (current user only)
              "" // Fallback to placeholder for all other users
            }
            alt={comment.author}
            onError={(e) => (e.target.src = "")} // Fallback to placeholder on error
          />
          <div className="flex-1">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-sm text-gray-800">{comment.author}</p>
                <div className="flex items-center text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <FiMoreHorizontal />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
            <div className="flex mt-1 ml-1 text-xs text-gray-500 space-x-4">
              <button className="hover:text-blue-600">Like</button>
              <button
                className="hover:text-blue600"
                onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
              >
                Reply
              </button>
            </div>

            {/* Nested reply input */}
            <AnimatePresence>
              {activeComment === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 ml-2 flex items-start space-x-2"
                >
                  <FiCornerDownRight className="text-gray-400 mt-2" />
                  <div className="flex-1">
                    <textarea
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                      placeholder={`Reply to ${comment.author}...`}
                      value={nestedReplyContent}
                      onChange={(e) => setNestedReplyContent(e.target.value)}
                      rows={1}
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
                        className="px-3 py-1 rounded-md text-sm font-medium text-white"
                        style={{ backgroundColor: primaryColor }}
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
        {/* Recursively render nested comments */}
        {renderNestedComments(comments, comment.id, level + 1)}
      </div>
    ));
  };

  return (
    <motion.div
      key={forum.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-6"
    >
      {/* Header Section with Author Info */}
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full object-cover border border-gray-300"
          src={
            forum.profileUser || // Use the profile image for the forum author (current user only)
            "" // Fallback to placeholder for all other users
          }
          alt={forum.author}
          onError={(e) => (e.target.src = "")} // Fallback to placeholder on error
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-800">{forum.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(forum.created_at).toLocaleDateString()}
          </p>
        </div>

        {isAuthor && (
          <div className="ml-auto flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
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
              <FiEdit size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-gray-500 hover:text-red-600 p-2"
              onClick={() => handleDeleteForum(forum.id)}
            >
              <FiTrash2 size={18} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="mb-4">
        <div className="flex items-start">
          {forum.image && (
            <img
              className="h-20 w-20 rounded-lg object-cover mr-4 border border-gray-300 cursor-pointer"
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

            <p className="text-gray-700 leading-relaxed">{forum.description}</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
        <div className="flex space-x-6">
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FiHeart className="mr-1" />
            <span className="text-sm">Like</span>
          </button>

          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => {
              setShowComments(!showComments);
              if (!showComments) setVisibleComments(3);
            }}
          >
            <FiMessageSquare className="mr-1" />
            <span className="text-sm">Comments ({forumComments.length})</span>
          </button>

          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FiShare2 className="mr-1" />
            <span className="text-sm">Share</span>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            {/* Input */}
            {accessToken && (
              <div className="flex items-start space-x-3 mb-4">
                <img
                  className="h-8 w-8 rounded-full object-cover border border-gray-300"
                  src={forum.profileUser || ""}
                  alt={currentUsername}
                  onError={(e) => (e.target.src = "")}
                />
                <div className="flex-1">
                  <textarea
                    rows={1}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                    placeholder="Write a comment..."
                    value={showReplyForm === forum.id ? replyContent : ""}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onClick={() => setShowReplyForm(forum.id)}
                  />

                  {showReplyForm === forum.id && (
                    <div className="mt-2 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReply(forum.id)}
                        className="px-4 py-2 rounded-md text-sm font-medium text-white"
                        style={{ backgroundColor: primaryColor }}
                        disabled={!replyContent.trim()}
                      >
                        Post
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* displae */}
            <div className="space-y-3 max-h-96 overflow-y-auto rounded-lg">
              {renderNestedComments(forumComments.slice(0, visibleComments))}
            </div>

            {/* more message */}
            {forumComments.length > visibleComments && (
              <div className="mt-3 text-center">
                <button
                  onClick={handleShowMoreComments}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
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
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
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