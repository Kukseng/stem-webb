import React from 'react';
import { FaFilePdf, FaPlayCircle } from 'react-icons/fa';
import { getYouTubeEmbedUrl } from '../../utils/embedurl';

const MediaViewer = ({ content, lessonTitle }) => {
  const embedVideoUrl = content.video_url ? getYouTubeEmbedUrl(content.video_url) : null;

  return (
    <div className="relative">
      {embedVideoUrl ? (
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            src={embedVideoUrl}
            title={content.video_title || lessonTitle}
            className="absolute top-0 left-0 w-full h-full border-0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : content.file ? (
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4">
          <a
            href={content.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
          >
            <FaFilePdf className="mr-2" /> ទាញយក PDF
          </a>
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
          <div className="text-center p-6">
            <FaPlayCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>មិនមានមាតិកាបង្ហាញទេ។</p>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;