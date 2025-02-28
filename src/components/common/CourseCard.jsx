// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css'; // Import Swiper styles
// import 'swiper/css/navigation'; // Optional: If you want navigation buttons
// import 'swiper/css/pagination'; // Optional: If you want pagination
// import { Navigation, Pagination } from 'swiper/modules'; // Import required modules

// const slides = [
//   {
//     image: "https://picsum.photos/200/300",
//     title: "This is a title",
//     description: "This is a description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/600/500",
//     title: "This is a second title",
//     description: "This is a second description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   },
//   {
//     image: "https://picsum.photos/700/600",
//     title: "This is a third title",
//     description: "This is a third description",
//     clickEvent: "sliderClick"
//   }
// ];

// const CourseCard = () => {
//   return (
//     <div className='w-full py-16  mt-16'> {/* Add margin-top equal to navbar height */}
//       <div className='grid grid-cols-1 gap-5'>
//         {/* Slider Section */}
//         <h1 className='text-center mb-5 text-3xl font-bold'>Popular Courses</h1>
//         <div className='bg-red-400 p-5 flex justify-center items-center'>
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={20}
//             slidesPerView={3} // Number of slides visible at once
//             navigation // Enable navigation arrows
//             pagination={{ clickable: true }} // Enable pagination dots
//             className="w-full max-w-7xl mx-auto"
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div className='mb-2'>
//                   <img
//                     className='w-[288px] h-[220px] object-cover rounded-t-md'
//                     src={slide.image}
//                     alt={slide.title}
//                   />
//                   <div>
//                     <h1>{slide.title}</h1>
//                     <p>{slide.description}</p>
//                   </div>
//                   <div className='flex justify-between items-center'>
//                     <button>Details</button>
//                     <button onClick={() => console.log(slide.clickEvent)}>Enroll</button>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         {/* Other Sections */}
//         <div className='bg-red-400 p-5 flex justify-center items-center'>
//           <h1>New Courses</h1>
//         </div>
//         <div className='bg-red-400 p-5 flex justify-center items-center'>
//           <h1>Trend Courses</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;