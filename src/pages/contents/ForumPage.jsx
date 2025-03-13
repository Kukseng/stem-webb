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
import Loader from "../../components/common/Loading";
import ForumCard from "../../components/forum/ForumCard";
import ForumForm from "../../components/forum/./ForumForm";
import { FiSearch } from "react-icons/fi";

// Hypothetical API call to fetch user profile images

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
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfileImages, setUserProfileImages] = useState({}); // Store profile images

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


  useEffect(() => {
    const fetchProfileImages = async () => {
      const uniqueAuthors = new Set();
      forums.forEach((forum) => {
        forum.comments.forEach((comment) => {
          uniqueAuthors.add(comment.author);
        });
      });

      const profileImages = {};
      for (const author of uniqueAuthors) {
        profileImages[author] = await fetchUserProfileImage(author);
      }
      setUserProfileImages(profileImages);
    };

    if (forums.length > 0) {
      fetchProfileImages();
    }
  }, [forums]);

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

  if (profileLoading || forumsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-primary h-12 w-12 mb-4" />
        <p className="text-gray-600 font-medium">កំពុងផ្ទុកវគ្គសិក្សា...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-600 font-bold text-lg mb-2">មានបញ្ហាកើតឡើង</h2>
          <p className="text-red-500">
            {profileError?.data?.message || profileError?.message || "មិនអាចទាញយកវគ្គសិក្សាបានទេ"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white ">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-primary ">ចែករំលែកចំណោះដឹង</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ស្វែងរកវេទិកា..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                បង្កើតវេទិកា
              </motion.button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
          )}

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

          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            {filteredForums.length > 0 ? (
              filteredForums.map((forum) => (
                <ForumCard
                  key={forum.id}
                  forum={{
                    ...forum,
                    comments: forum.comments.map((comment) => ({
                      ...comment,
                      profileImage: userProfileImages[comment.author], // Add profile image to each comment
                    })),
                  }}
                  currentUsername={currentUsername}
                  // profileUser={profileUser}
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
                  expandedComments={expandedComments}
                  setExpandedComments={setExpandedComments}
                  handleUpdateForum={handleUpdateForum}
                  handleDeleteForum={handleDeleteForum}
                  handleReply={handleReply}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                មិនមានវេទិកាដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ។
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;