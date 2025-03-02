import React from 'react';
import { Calendar } from 'lucide-react';
import Conten from '../../components/layout/counten/Conten';

const ArticleCard = ({ image, date, title, excerpt }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <img 
      src={image || "/api/placeholder/400/250"} 
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Calendar size={16} className="mr-1" />
        {date}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
    </div>
  </div>
);

const CategoryItem = ({ name, count }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-700 hover:text-blue-600 cursor-pointer">{name}</span>
    <span className="text-gray-500 text-sm">{count}</span>
  </div>
);

const RecentPost = ({ image, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <img 
      src={image || "/api/placeholder/80/80"} 
      alt={title}
      className="w-16 h-16 object-cover rounded"
    />
    <h4 className="text-sm font-medium hover:text-blue-600 cursor-pointer">{title}</h4>
  </div>
);

const Pagination = () => (
  <div className="flex justify-center gap-2 mt-8">
    <button className="w-8 h-8 rounded-full border hover:bg-gray-100">←</button>
    <button className="w-8 h-8 rounded-full bg-black text-white">1</button>
    <button className="w-8 h-8 rounded-full border hover:bg-gray-100">2</button>
    <button className="w-8 h-8 rounded-full border hover:bg-gray-100">3</button>
    <button className="w-8 h-8 rounded-full border hover:bg-gray-100">→</button>
  </div>
);

const BlogPage = () => {
  const articles = Array(6).fill({
    title: "ការរចនា UI/UX សម្រាប់អ្នកចាប់ផ្តើមដំបូង",
    date: "Jan 24, 2023",
    excerpt: "Looking for an amazing & well-functional LearnPress WordPress Theme?",
  });

  const categories = [
    { name: "Commercial", count: 15 },
    { name: "Office", count: 15 },
    { name: "Shop", count: 15 },
    { name: "Private", count: 15 },
    { name: "Academy", count: 15 },
    { name: "Single family home", count: 15 },
  ];

  return (
    // <div className="max-w-6xl mx-auto p-6">
    //   <div className="flex gap-8">
    //     {/* Main Content */}
    //     <div className="w-3/4">
    //       <h1 className="text-2xl font-bold mb-6">All Articles</h1>
          
    //       <div className="grid grid-cols-2 gap-6">
    //         {articles.map((article, index) => (
    //           <ArticleCard key={index} {...article} />
    //         ))}
    //       </div>

    //       <Pagination />
    //     </div>

    //     {/* Sidebar */}
    //     <div className="w-1/4">
    //       <div className="mb-8">
    //         <h2 className="text-lg font-semibold mb-4">Category</h2>
    //         <div className="divide-y">
    //           {categories.map((category, index) => (
    //             <CategoryItem key={index} {...category} />
    //           ))}
    //         </div>
    //       </div>

    //       <div>
    //         <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
    //         {articles.slice(0, 3).map((article, index) => (
    //           <RecentPost key={index} {...article} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <Conten/>
    </div>
  );
};

export default BlogPage;