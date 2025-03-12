// import React, { useState } from 'react';
// import { Star } from 'lucide-react';
// // import { CircularPagination } from '../../components/common/Pegenation';

// const TeacherCard = ({ teacher }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//     <div className="aspect-square overflow-hidden">
//       <img 
//         src={teacher.image} 
//         alt={teacher.name} 
//         className="w-full h-full object-cover"
//       />
//     </div>
//     <div className="p-4">
//       <h3 className="font-semibold text-center mb-2">{teacher.name}</h3>
//       <div className="flex justify-center mb-2">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={16}
//             className="fill-yellow-400 text-yellow-400"
//           />
//         ))}
//       </div>
//       <p className="text-sm text-gray-600 text-center">
//         {teacher.description}
//       </p>
//     </div>
//   </div>
// );

// const LecturerPage = () => {
//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold mb-4">ក្រុមគ្រូបង្រៀនផ្នែកបច្ចេកវិទ្យា STEM</h1>
//       </div>

//       {/* Teacher Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {teachers.map((teacher, idx) => (
//           <TeacherCard key={idx} teacher={teacher} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-8 gap-2">
//         <button 
//           className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
//           onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//         >
//           ←
//         </button>
//         {[1, 2, 3].map((page) => (
//           <button
//             key={page}
//             className={`w-8 h-8 rounded-full flex items-center justify-center ${
//               currentPage === page ? 'bg-blue-500 text-white' : 'border hover:bg-gray-50'
//             }`}
//             onClick={() => setCurrentPage(page)}
//           >
//             {page}
//           </button>
//         ))}
//         <button 
//           className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
//           onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
//         >
//           →
//         </button>
//       </div>

//       {/* Certificate Section */}
//       <div className="mt-16">
//         <h2 className="text-xl font-bold mb-6">អត្ថប្រយោជន៍នៃការសិក្សា ISTEM</h2>
//         <div className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">1</div>
//             <p>មានបទពិសោធន៍ធ្វើ Project ជាមួយក្រុមហ៊ុនដៃគូរបស់ CSTAD</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">2</div>
//             <p>អាចស្នើសុំវិញ្ញាបនបត្របញ្ជាក់ការសិក្សាពីក្រសួងប្រៃសណីយ៍</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">3</div>
//             <p>រៀនជាមួយគ្រូជំនាញ និងអ្នកមានបទពិសោធន៍ច្បាស់លាស់</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LecturerPage;