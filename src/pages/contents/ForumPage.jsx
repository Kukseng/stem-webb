import React, { useState } from "react";
import {
  useCreateForumMutation,
  useGetAllForumsQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useReplyToForumMutation,
} from "../../api/forums-api";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiEdit,
  FiTrash2,
  FiMessageSquare,
  FiSend,
  FiX,
  FiChevronDown,
  FiChevronUp, 
} from "react-icons/fi";
import { useGetProfileQuery } from "../../api/auth-api";

const ForumPage = () => {
  const [activeTab, setActiveTab] = useState("forums");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [expandedComments, setExpandedComments] = useState(null); 
  const [forumData, setForumData] = useState({ title: "", description: "", image: "" });
  const [editData, setEditData] = useState({ title: "", description: "", image: "" });
  const [replyContent, setReplyContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { accessToken } = useSelector((state) => state.auth);
  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileQuery();
  const currentUsername = profileData?.username || "unknown";

  // Debugging logs
  console.log("Access Token:", accessToken);
  console.log("Profile Data:", profileData);
  console.log("Current Username:", currentUsername);
  console.log("Profile Loading:", profileLoading);
  console.log("Profile Error:", profileError);

  // API Hooks
  const { data: forumsData, isLoading: forumsLoading, refetch: refetchForums } = useGetAllForumsQuery();
  const [createForum] = useCreateForumMutation();
  const [updateForum] = useUpdateForumMutation();
  const [deleteForum] = useDeleteForumMutation();
  const [replyToForum] = useReplyToForumMutation();

  const forums = [...(forumsData?.results || forumsData || [])].sort((a, b) =>
    new Date(b.created_at) - new Date(a.created_at)
  );

  console.log("Forums Data:", forumsData);
  console.log("Sorted Forums:", forums);

  const primaryColor = "#16789e";
  const primaryColorDark = "#106080";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const commentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

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
      console.error("Error creating forum:", error);
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
      console.error("Error updating forum:", error);
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
        console.error("Error deleting forum:", error);
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
      console.log("Sending reply:", { forum_id: forumId, content: replyContent });
      const response = await replyToForum({ forum_id: forumId, content: replyContent }).unwrap();
      console.log("Reply response:", response);
      setReplyContent("");
      setShowReplyForm(null);
      setErrorMessage("");
      refetchForums();
    } catch (error) {
      console.error("Error replying to forum:", error);
      setErrorMessage("Failed to post comment: " + (error.data?.detail || "Unknown error"));
    }
  };

  const toggleComments = (forumId) => {
    setExpandedComments(expandedComments === forumId ? null : forumId);
  };

  if (profileLoading || forumsLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (profileError) {
    return <div className="text-center text-red-500">Error loading profile: {profileError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="ml-6 flex space-x-8">
                {["forums", "courses", "resources"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === tab
                        ? "border-[#16789e] text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    style={{ borderColor: activeTab === tab ? primaryColor : "transparent" }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Education Forums</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              Create New Topic
            </motion.button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-white p-6 rounded-xl shadow-md"
              >
                <form onSubmit={handleCreateForum}>
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <FiEdit style={{ color: primaryColor }} />
                      <span>Title</span>
                    </label>
                    <input
                      type="text"
                      value={forumData.title}
                      onChange={(e) =>
                        setForumData({ ...forumData, title: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      placeholder="Enter forum title"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <FiBook style={{ color: primaryColor }} />
                      <span>Description</span>
                    </label>
                    <textarea
                      value={forumData.description}
                      onChange={(e) =>
                        setForumData({ ...forumData, description: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-24"
                      placeholder="Enter forum description"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <FiChevronDown style={{ color: primaryColor }} />
                      <span>Image URL</span>
                    </label>
                    <input
                      type="text"
                      value={forumData.image}
                      onChange={(e) =>
                        setForumData({ ...forumData, image: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 rounded-md text-sm font-medium text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Create
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            {forums.length > 0 ? (
              forums.map((forum) => {
                const forumComments = forum.comments || [];
                const isAuthor = currentUsername === forum.author;
                const isCommentsExpanded = expandedComments === forum.id;

                console.log(`Forum ID: ${forum.id}, Author: ${forum.author}, Is Author: ${isAuthor}`);
                console.log("Forum Image:", forum.image || forum.image_url);

                return (
                  <motion.div
                    key={forum.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-lg"
                          src={forum.image || forum.image_url || "/api/placeholder/48/48"}
                          alt={forum.title}
                          onError={(e) => {
                            e.target.src = "/api/placeholder/48/48";
                            console.log("Image failed to load:", forum.image || forum.image_url);
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium" style={{ color: primaryColor }}>
                            {forum.title}
                          </h3>
                          {isAuthor && (
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => {
                                  setEditData({
                                    title: forum.title,
                                    description: forum.description,
                                    image: forum.image || forum.image_url || "",
                                  });
                                  setShowEditForm(forum.id);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <FiEdit />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handleDeleteForum(forum.id)}
                                className="text-gray-500 hover:text-red-600"
                              >
                                <FiTrash2 />
                              </motion.button>
                            </div>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{forum.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <span>By {forum.author}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {forumComments.length}{" "}
                              {forumComments.length === 1 ? "comment" : "comments"}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{new Date(forum.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {accessToken && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() =>
                                  setShowReplyForm(showReplyForm === forum.id ? null : forum.id)
                                }
                                className="text-sm font-medium"
                                style={{ color: primaryColor }}
                              >
                                មតិ
                              </motion.button>
                            )}
                            {forumComments.length > 0 && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => toggleComments(forum.id)}
                                className="text-sm font-medium flex items-center"
                                style={{ color: primaryColor }}
                              >
                                {isCommentsExpanded ? (
                                  <>
                                    <FiChevronUp className="mr-1" />
                                    Hide Comments
                                  </>
                                ) : (
                                  <>
                                    <FiChevronDown className="mr-1" />
                                    Show Comments
                                  </>
                                )}
                              </motion.button>
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {showEditForm === forum.id && isAuthor && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <form onSubmit={(e) => handleUpdateForum(e, forum.id)}>
                                <div className="mb-4">
                                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                                    <FiEdit style={{ color: primaryColor }} />
                                    <span>Title</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) =>
                                      setEditData({ ...editData, title: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                                    <FiBook style={{ color: primaryColor }} />
                                    <span>Description</span>
                                  </label>
                                  <textarea
                                    value={editData.description}
                                    onChange={(e) =>
                                      setEditData({ ...editData, description: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-24"
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                                    <FiChevronDown style={{ color: primaryColor }} />
                                    <span>Image URL</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={editData.image}
                                    onChange={(e) =>
                                      setEditData({ ...editData, image: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => setShowEditForm(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="px-4 py-2 rounded-md text-sm font-medium text-white"
                                    style={{ backgroundColor: primaryColor }}
                                  >
                                    Update
                                  </motion.button>
                                </div>
                              </form>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {showReplyForm === forum.id && accessToken && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4"
                            >
                              <textarea
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                placeholder="Write your reply here..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                              />
                              <div className="mt-2 flex justify-end space-x-2">
                                <button
                                  onClick={() => setShowReplyForm(null)}
                                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleReply(forum.id)}
                                  className="px-4 py-2 rounded-md text-sm font-medium text-white"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  Submit
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {isCommentsExpanded && forumComments.length > 0 ? (
                            <motion.div
                              variants={commentVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="mt-4"
                            >
                              {forumComments.map((comment) => (
                                <div key={comment.id} className="p-3 bg-gray-50 rounded-lg mb-2">
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Posted by {comment.author} on{" "}
                                    {new Date(comment.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          ) : (
                            forumComments.length === 0 && (
                              <p className="mt-4 text-sm text-gray-500">No comments yet.</p>
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-6 text-center text-gray-500">No forums available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;