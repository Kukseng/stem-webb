import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "../pages/contents/HomePage";
import CoursePage from "../pages/contents/course/coursepage";
import LecturerPage from "../pages/contents/LecturerPage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import AllCoursePage from "../pages/contents/AllCoursePage";
import CourseDetailPage from "../pages/contents/coursedetailpage";
import AllCourseDetail from "../pages/contents/allcourse-detail";
import MainLayout from "../layouts/MainLayout";
import Profile from "../components/layout/counten/Profile"; 
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
          path="/courses"
          element={
            <MainLayout>
              <CoursePage/>
            </MainLayout>
          }
        />
        <Route
          path="/teacher"
          element={
            <MainLayout>
              <LecturerPage/>
            </MainLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <MainLayout>
             <AboutPage/>
            </MainLayout>
          }
        />
        <Route
          path="/blog"
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
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile/>
            </MainLayout>
          }
        />

        <Route path="/courses/:courseId" element={<CourseDetailPage/>} />
        <Route path="/lesson/${lessonId}" element={<AllCourseDetail/>} />
      </Routes>
    </Router>
  );
}
