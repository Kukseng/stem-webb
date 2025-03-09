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
import LoginForm from "../pages/auth/LoginFrom";
import SigupPage from "../pages/auth/SigupPage";
import ForgetForm from "../pages/auth/ForgetForm";
import VerifyOtp from "../pages/auth/VerifyOtp";
import UserProfile from "../components/common/userprofile/UserProfilecom";
import CategoryDetailsPage from "../components/common/courses/Detail/Category-Detail";
import Categories from "../components/common/courses/Categories";
import LessonsCard from "../components/lesson/LessonCard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Navbar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <MainLayout>
              <CoursePage />
            </MainLayout>
          }
        />
        <Route
          path="/teacher"
          element={
            <MainLayout>
              <LecturerPage />
            </MainLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />
        {/* coures */}
        <Route
          path="/allcourse"
          element={
            <MainLayout>
              <AllCoursePage />
            </MainLayout>
          }
        />

        <Route path="/courses/:courseId/categories" element={<Categories/>} />
        <Route path="/lesson/${lessonId}" element={<AllCourseDetail />} />
        <Route path="/courses/:courseId/categories/:categoryId/lessons" element={<LessonsCard/>} />

        {/* Form */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SigupPage/>} />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
        <Route path="/forgot-password" element={<ForgetForm/>} />

        <Route path="/profile" element={<UserProfile/>} />



        
      </Routes>
    </Router>
  );
}
