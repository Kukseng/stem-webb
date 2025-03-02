import React, { useState } from 'react';

const CourseCard = ({ course }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>{course.title}</h3>
      <p>Category: {course.category}</p>
      <p>Rating: {course.rating} | Students: {course.studentCount}</p>
      <p>Modules: {course.modules} lessons | Hours: {course.hours} hours</p>
      <button>Register</button>
      <button>Details</button>
    </div>
  );
};

const CourseListingPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const courses = [
    {
      id: 1,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Astronomy"
    },
    {
      id: 2,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "C#"
    },
    {
      id: 3,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជា",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Finance"
    },
  ];
  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subject === selectedSubject)
    : courses;

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Subjects</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[...new Set(courses.map((course) => course.subject))].map((subject, index) => (
            <li
              key={index}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: selectedSubject === subject ? '#f0f0f0' : 'transparent',
              }}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </li>
          ))}
          <li
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: selectedSubject === null ? '#f0f0f0' : 'transparent',
            }}
            onClick={() => setSelectedSubject(null)}
          >
            Show All
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '10px' }}>
        <h2>Courses</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseListingPage;