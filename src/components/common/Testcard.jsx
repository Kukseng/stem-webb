
  import { Button } from "flowbite-react";
  import { FaRegClock } from "react-icons/fa";
  
  const courses = [
    {
      id: 1,
      title: "UI/UX Design",
      description: "ការចាប់ផ្តើម UI/UX សម្រាប់អ្នកបើកដំណើរនៅដើម",
      image: "https://via.placeholder.com/300", // Replace with actual image
      rating: 5,
      duration: "6 ម៉ោង",
      students: "3,000",
    },
    {
      id: 2,
      title: "Math",
      description: "ការចាប់ផ្តើម UI/UX សម្រាប់អ្នកបើកដំណើរនៅដើម",
      image: "https://via.placeholder.com/300",
      rating: 5,
      duration: "6 ម៉ោង",
      students: "9,000",
    },
    {
      id: 3,
      title: "Physics",
      description: "ការចាប់ផ្តើម UI/UX សម្រាប់អ្នកបើកដំណើរនៅដើម",
      image: "https://via.placeholder.com/300",
      rating: 5,
      duration: "6 ម៉ោង",
      students: "9,000",
    },
  ];
  
  const CourseCard = ({ course }) => {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 max-w-xs">
        <img
          src={course.image}
          alt={course.title}
          className="rounded-lg w-full h-40 object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold">{course.title}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
        <div className="flex items-center gap-2 text-yellow-500 my-2">
          {"★".repeat(course.rating)}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaRegClock /> {course.duration}
          </span>
          <span>{course.students} ក្មេង</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button color="blue">ចាប់ផ្តើម</Button>
          <a href="#" className="text-blue-600 font-medium">
            ពត៌មានលម្អិត
          </a>
        </div>
      </div>
    );
  };
  
  const CoursePlatform  = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">📚 កម្មវិធីរៀន</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    );
  };
  
  export default CoursePlatform ;
  