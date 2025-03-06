// import React from "react";
// import PropTypes from "prop-types";

// const CategoryTag = ({ text, color = "pink" }) => {
//   const colorClasses = {
//     pink: "bg-pink-100 text-pink-600",
//     blue: "bg-blue-100 text-blue-600",
//     orange: "bg-orange-100 text-orange-600",
//     purple: "bg-purple-100 text-purple-600",
//   };

//   return (
//     <span
//       className={`${colorClasses[color]} px-3 py-1 rounded-full text-sm mr-2 mb-2`}
//     >
//       {text}
//     </span>
//   );
// };

// CategoryTag.propTypes = {
//   text: PropTypes.string.isRequired,
//   color: PropTypes.oneOf(["pink", "blue", "orange", "purple"]),
// };

// const ArticleCard = ({ image, date, title, description, categories }) => (
//   <div className="flex gap-6 mb-8">
//     <div className="w-1/3">
//       <img
//         src={image || "/api/placeholder/400/300"}
//         alt={title}
//         className="w-full h-48 object-cover rounded-lg"
//       />
//     </div>
//     <div className="w-2/3">
//       <div className="text-emerald-500 text-sm mb-2">{date}</div>
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
//       <div className="flex flex-wrap">
//         {categories.map((category, index) => (
//           <CategoryTag
//             key={index}
//             text={category.text}
//             color={category.color}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// ArticleCard.propTypes = {
//   image: PropTypes.string,
//   date: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       color: PropTypes.oneOf(["pink", "blue", "orange", "purple"]),
//     })
//   ).isRequired,
// };

// const BlogListing = () => {
//   const articles = [
//     {
//       date: "November 16, 2014",
//       title: "មូលដ្ឋានគ្រឹះនៃការរចនាវេបសាយ",
//       description:
//         "មូលដ្ឋានគ្រឹះសម្រាប់ការរចនាវេបសាយដូចជា HTML សម្រាប់រចនាគម្រោង CSS សម្រាប់រចនាម៉ូដ និង JavaScript សម្រាប់...",
//       categories: [
//         { text: "Research", color: "pink" },
//         { text: "UI UX", color: "blue" },
//       ],
//     },
//     {
//       date: "September 24, 2017",
//       title: "វិធីសាស្រ្តថ្មី UX",
//       description:
//         "តើការរចនាដែលទាក់ទាញអ្នកប្រើប្រាស់គួរត្រូវបានធ្វើឡើងដោយរបៀបណា? តើ UX មានតួនាទី...",
//       categories: [
//         { text: "Research", color: "pink" },
//         { text: "UI Design", color: "blue" },
//       ],
//     },
//     {
//       date: "March 13, 2014",
//       title: "ការម្រាវជ្រាវនិងអនុវត្តន៍ និងការអភិវឌ្ឍប្រព័ន្ធ",
//       description:
//         "វិធីសាស្រ្តសម្រាប់ការត្រួតពិនិត្យនិងការអភិវឌ្ឍប្រព័ន្ធដែលត្រូវការជំនាញក្នុងការប្រើប្រាស់បច្ចេកវិទ្យាថ្មីៗ",
//       categories: [
//         { text: "Programming", color: "orange" },
//         { text: "Research", color: "pink" },
//         { text: "Developments", color: "purple" },
//       ],
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold mb-2">អត្ថបទចុងក្រោយ</h1>
//           <p className="text-gray-600">អត្ថបទចុងក្រោយដែលគួរអានសិន</p>
//         </div>
//         <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
//           អត្ថបទទាំងអស់
//         </button>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {articles.map((article, index) => (
//           <ArticleCard key={index} {...article} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogListing;
