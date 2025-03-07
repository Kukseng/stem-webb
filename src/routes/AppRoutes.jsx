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
import Khmer from "../components/khmer/Khmer";
import Math from "../components/math/Math";
import Biology from "../components/biology/Biology";
import Physics from "../components/physics/Physics";

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
        {/* CoursePage */}
        <Route path="/khmer" element={<MainLayout><Khmer /></MainLayout>} />
        <Route path="/math" element={<MainLayout><Math /></MainLayout>} />
        <Route path="/biology" element={<MainLayout><Biology /></MainLayout>} />
        <Route path="/physic" element={<MainLayout><Physics /></MainLayout>} />

        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/lesson/${lessonId}" element={<AllCourseDetail />} />


        {/* Form */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SigupPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgetForm />} />



      </Routes>
    </Router>
  );
}
