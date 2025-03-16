import React from "react";
import { Routes, Route } from "react-router";
import { AuthProvider } from "../components/context/AuthContext.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import HomePage from "../pages/contents/HomePage";
import CoursePage from "../pages/contents/course/coursepage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import AllCoursePage from "../pages/contents/AllCoursePage";
import MainLayout from "../layouts/MainLayout";
import LoginForm from "../pages/auth/LoginFrom";
import SigupPage from "../pages/auth/SigupPage";
import ForgetForm from "../pages/auth/ForgetForm";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Categories from "../components/common/courses/Categories";
import LessonsCard from "../components/coursees/lesson/LessonCard.jsx";
import ForumPage from "../pages/contents/ForumPage";
import BlogDetail from "../components/blog/BlogDetail";
import StemCommunity from "../pages/contents/StemCommunity.jsx";
import ProfilePage from "../pages/contents/ProfilePage.jsx";

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
          path="/articles"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />
        <Route
          path="/articles/:id/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BlogDetail />
              </MainLayout>
            </ProtectedRoute>
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
          element={<LessonsCard />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}