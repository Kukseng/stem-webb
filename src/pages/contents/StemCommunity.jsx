// src/pages/contents/StemCommunity.jsx
import React from "react";
import { useGetAllForumsQuery } from "../../api/forums-api";
import StemChatRoom from "../../components/stem/StemChatRoom";
import { useSelector } from "react-redux";

const StemCommunity = () => {
  const { data: forumsData, isLoading } = useGetAllForumsQuery();
  const accessToken = useSelector((state) => state.auth?.accessToken); // Adjust path
  const currentUsername = useSelector((state) => state.auth?.username);

  if (isLoading) return <div>Loading STEM Community...</div>;

  const forums = forumsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">STEM Education Chat Community</h1>
      <p className="text-gray-600 mb-6">
        Join our chat rooms to discuss STEM topics like Math, Physics, and more!
      </p>
      <div className="grid gap-6">
        {forums.map((forum) => (
          <StemChatRoom
            key={forum.id}
            forum={forum}
            currentUsername={currentUsername || "Guest"}
            accessToken={accessToken}
          />
        ))}
      </div>
    </div>
  );
};

export default StemCommunity;