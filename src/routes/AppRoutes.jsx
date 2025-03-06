import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "../pages/contents/homepage";
import CoursePage from "../pages/contents/course/coursepage";
import LecturerPage from "../pages/contents/lecturerpage";
import AboutPage from "../pages/contents/aboutpage";
import BlogPage from "../pages/contents/blogpage";
import AllCoursePage from "../pages/contents/allcoursepage";
import CourseDetailPage from "../pages/contents/coursedetailpage";
import AllCourseDetail from "../pages/contents/allcourse-detail";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage/>
            </MainLayout>
          }
        />
        <Route
          path="/វគ្គសិក្សា"
          element={
            <MainLayout>
              <CoursePage/>
            </MainLayout>
          }
        />
        <Route
          path="/គ្រូបង្រៀន"
          element={
            <MainLayout>
              <LecturerPage/>
            </MainLayout>
          }
        />
        <Route
          path="/អំពីពួកយើង"
          element={
            <MainLayout>
             <AboutPage/>
            </MainLayout>
          }
        />
        <Route
          path="/មាតិកា"
          element={
            <MainLayout>
              <BlogPage/>
            </MainLayout>
          }
        />
        <Route
          path="/allcourse"
          element={
            <MainLayout>
              <AllCoursePage/>
            </MainLayout>
          }
        />
        {/* <Route
          path="/ចូលគណនី"
          element={
            <MainLayout>
              <LoginForm />
            </MainLayout>
          }
        /> */}
        {/* <Route
          path="/physics"
          element={
            <MainLayout>
              <PhysicsPage />
            </MainLayout>
          }
        />
        <Route
          path="/mathematics"
          element={
            <MainLayout>
              <MathPage />
            </MainLayout>
          }
        />
        <Route
          path="/biology"
          element={
            <MainLayout>
              <BiologyPage />
            </MainLayout>
          }
        />
        <Route
          path="/Khmer"
          element={
            <MainLayout>
              <KhmerPage />
            </MainLayout>
          }
        /> */}
        <Route path="/courses/:courseId" element={<CourseDetailPage/>} />
        <Route path="/វគ្គសិក្សា/${lessonId}" element={<AllCourseDetail/>} />
      </Routes>
    </Router>
  );
}
