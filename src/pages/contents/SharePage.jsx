// src/pages/contents/SharePage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SharePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  const title = decodeURIComponent(queryParams.get("title") || "Untitled Forum Post");
  const desc = decodeURIComponent(queryParams.get("desc") || "No description available");
  const img = decodeURIComponent(
    queryParams.get("img") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&s"
  );

  console.log("SharePage Query Params:", { type, id, title, desc, img, url: window.location.href });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
          {img && (
            <img
              src={img}
              alt={title}
              className="w-full h-64 object-cover rounded-lg mb-4"
              onError={(e) => (e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&s")}
            />
          )}
          <p className="text-gray-700">{desc}</p>
          <p className="text-sm text-gray-500 mt-4">
            Shared from Forum ID: {id} | Type: {type}
          </p>
        </div>
      </div>
    </>
  );
};

export default SharePage;