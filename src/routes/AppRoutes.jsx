import React from "react";
import { Routes, Route } from "react-router";
import { AuthProvider } from "../components/context/AuthContext.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import HomePage from "../pages/contents/HomePage";
import CoursePage from "../pages/contents/course/coursepage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import AllCoursePage from "../pages/contents/AllCoursePage";
import AllCourseDetail from "../pages/contents/allcourse-detail";
import MainLayout from "../layouts/MainLayout";
import LoginForm from "../pages/auth/LoginFrom";
import SigupPage from "../pages/auth/SigupPage";
import ForgetForm from "../pages/auth/ForgetForm";
import VerifyOtp from "../pages/auth/VerifyOtp";
import UserProfile from "../components/userprofile/UserProfilecom";
import Categories from "../components/common/courses/Categories";
import LessonsCard from "../components/lesson/LessonCard";
import ForumPage from "../pages/contents/ForumPage";
import BlogDetail from "../components/blog/BlogDetail";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SigupPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgetForm />} />

        {/* Routes with MainLayout (Public or Semi-Protected) */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
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
        <Route
          path="/articles/:id"
          element={
          
            <MainLayout>
              <BlogDetail />
            </MainLayout>
         
          }
        />
        <Route
          path="/forums"
          element={
            <MainLayout>
              <ForumPage />
            </MainLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/courses"
          element={
            
              <MainLayout>
                <AllCoursePage />
              </MainLayout>
            
          }
        />
        <Route
          path="/courses/:courseId"
          element={
          
              <MainLayout>
                <AllCoursePage />
              </MainLayout>
            
          }
        />
        <Route
          path="/courses/:courseId/categories"
          element={
          
              <MainLayout>
                <Categories />
              </MainLayout>
           
          }
        />
        <Route
          path="/courses/:courseId/categories/:categoryId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CoursePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId/categories/:categoryId/lessons"
          element={
         
           
                <LessonsCard />
             
            
          }
        />
        <Route
          path="/lesson/:lessonId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AllCourseDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserProfile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}