// import React from 'react';
// import { CalendarDays, MessageSquare, User, Clock } from 'lucide-react';

// const ForumPage = () => {
//   // Sample data provided from API
//   const forumData = {
//     "id": 1,
//     "title": "General Discussion",
//     "description": "A place for general discussion.",
//     "author": "Thearaa",
//     "profileUser": null,
//     "created_at": "2025-03-10T18:15:02.737914Z",
//     "updated_at": "2025-03-10T18:15:02.737958Z",
//     "image": "category_z5uqXXk.png",
//     "image_url": "http://stem-api.istad.co/media/uploads/category_z5uqXXk.png",
//     "comments": []
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <main className="container mx-auto px-4 py-8">
//         {/* Forum Header */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="h-40 bg-gradient-to-r from-cyan-700 to-blue-800 relative">
//             <div className="absolute inset-0 bg-black opacity-30"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <h1 className="text-4xl font-bold text-white">Forums</h1>
//             </div>
//           </div>
//         </div>

//         {/* Forum Content */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-center mb-6">
//               <div className="w-full md:w-1/4 mb-4 md:mb-0">
//                 <img 
//                   src={forumData.image_url || "/api/placeholder/400/300"} 
//                   alt={forumData.title}
//                   className="rounded-lg w-full object-cover h-40"
//                 />
//               </div>
//               <div className="w-full md:w-3/4 md:pl-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">{forumData.title}</h2>
//                 <p className="text-gray-600 mb-4">{forumData.description}</p>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <User size={16} className="mr-1 text-cyan-700" />
//                     <span>Created by: <span className="font-medium">{forumData.author}</span></span>
//                   </div>
//                   <div className="flex items-center">
//                     <CalendarDays size={16} className="mr-1 text-cyan-700" />
//                     <span>Created: {formatDate(forumData.created_at)}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock size={16} className="mr-1 text-cyan-700" />
//                     <span>Last updated: {formatDate(forumData.updated_at)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Discussion Section */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="border-b border-gray-200">
//             <div className="p-4 bg-cyan-700 text-white">
//               <h3 className="text-xl font-semibold">Discussions</h3>
//             </div>
//           </div>
          
//           {forumData.comments && forumData.comments.length > 0 ? (
//             <div className="p-4">
//               {forumData.comments.map((comment, index) => (
//                 <div key={index} className="border-b border-gray-100 py-4 last:border-0">
//                   {/* Comment content would go here */}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="p-8 text-center">
//               <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
//               <h4 className="text-xl font-medium text-gray-700 mb-2">No discussions yet</h4>
//               <p className="text-gray-500 mb-6">Be the first to start a conversation in this forum</p>
//               <button className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md transition-colors">
//                 Start New Discussion
//               </button>
//             </div>
//           )}
//         </div>

//         {/* New Discussion Form */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="border-b border-gray-200">
//             <div className="p-4 bg-cyan-700 text-white">
//               <h3 className="text-xl font-semibold">Create New Discussion</h3>
//             </div>
//           </div>
//           <div className="p-6">
//             <form>
//               <div className="mb-4">
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input 
//                   type="text" 
//                   id="title" 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="Enter discussion title"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
//                 <textarea 
//                   id="content" 
//                   rows="6" 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="What would you like to discuss?"
//                 ></textarea>
//               </div>
//               <div className="flex justify-end">
//                 <button 
//                   type="submit"
//                   className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md transition-colors"
//                 >
//                   Post Discussion
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ForumPage;
import React, { useState } from 'react';

const ForumPage = () => {
  const categories = [
    {
      id: 1,
      title: "General Discussion",
      description: "A place for general discussion.",
      author: "Thearaa",
      created_at: "2025-03-10T18:15:02.737914Z",
      updated_at: "2025-03-10T18:15:02.737958Z",
      image_url: "http://stem-api.istad.co/media/uploads/category_z5uqXXk.png",
      comments: []
    }
  ];

  const [activeTab, setActiveTab] = useState('forums');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="ml-6 flex space-x-8">
                {['forums', 'courses', 'resources'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === tab 
                        ? 'border-[#16789e] text-gray-900' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    style={{ borderColor: activeTab === tab ? '#16789e' : 'transparent' }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Education Forums</h1>
            <button 
              className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm"
              style={{ backgroundColor: '#16789e' }}
            >
              Create New Topic
            </button>
          </div>

          {/* Categories */}
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-lg" src={category.image_url || "/api/placeholder/48/48"} alt={category.title} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium" style={{ color: '#16789e' }}>{category.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(category.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>By {category.author}</span>
                        <span className="mx-2">•</span>
                        <span>{category.comments.length} {category.comments.length === 1 ? 'comment' : 'comments'}</span>
                      </div>
                      <button 
                        className="text-sm font-medium" 
                        style={{ color: '#16789e' }}
                        onClick={() => setShowReplyForm(!showReplyForm)}
                      >
                        Reply
                      </button>
                    </div>

                    {/* Reply Form */}
                    {showReplyForm && (
                      <div className="mt-4">
                        <textarea
                          rows={3}
                          className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Write your reply here..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <div className="mt-2 flex justify-end">
                          <button 
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => {
                              setShowReplyForm(false);
                              setReplyContent('');
                            }}
                          >
                            Cancel
                          </button>
                          <button 
                            className="px-4 py-2 rounded-md text-sm font-medium text-white"
                            style={{ backgroundColor: '#16789e' }}
                            onClick={() => {
                              alert('Reply submitted: ' + replyContent);
                              setShowReplyForm(false);
                              setReplyContent('');
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="Your Profile" />
              </div>
              <div className="min-w-0 flex-1">
                <textarea
                  rows={3}
                  className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Add your comment..."
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
                    style={{ backgroundColor: '#16789e' }}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForumPage;
