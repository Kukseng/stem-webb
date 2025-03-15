// src/components/stem/StemChatRoom.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import { useGetForumByIdQuery, useReplyToForumMutation } from "../../api/forums-api";

const StemChatRoom = ({ forum, currentUsername, accessToken }) => {
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Poll forum data to get comments
  const { data: forumData, isLoading } = useGetForumByIdQuery(forum.id, {
    skip: !showChat,
    pollingInterval: 5000, 
  });

  const [replyToForum] = useReplyToForumMutation();

  const messages = forumData?.comments || forum.comments || [];

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !accessToken) return;
    try {
      await replyToForum({
        forum_id: forum.id,
        content: newMessage,
      }).unwrap();
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <motion.div className="p-6 bg-white rounded-xl shadow-lg border mb-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full object-cover border-2"
          src={forum.profileUser}
          alt={forum.author}
        />
        <div className="ml-3 flex-1">
          <p className="font-semibold text-base">{forum.author}</p>
          <p className="text-xs text-gray-500">{new Date(forum.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: "#16789e" }}>
        {forum.title}
      </h3>
      <p className="text-gray-700 mb-6">{forum.description}</p>

      {/* Chat Toggle */}
      <button
        className="flex items-center text-gray-600 hover:text-blue-600"
        onClick={() => setShowChat(!showChat)}
      >
        <FiMessageSquare size={16} className="mr-1" /> Chat ({messages.length})
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 border-t pt-4"
          >
            {isLoading ? (
              <p>Loading messages...</p>
            ) : (
              <div className="max-h-60 overflow-y-auto mb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <p className="text-sm">
                      <span className="font-semibold">{msg.author}: </span>
                      {msg.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {accessToken ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l-md"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#16789e] text-white rounded-r-md"
                >
                  <FiSend />
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                <a href="/login" className="text-blue-600">Log in</a> to chat
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StemChatRoom;