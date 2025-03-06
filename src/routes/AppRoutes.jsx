import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
// import LoginForm from "../pages/auth/LoginForm";
import AllCoursePage from "../pages/contents/AllCoursePage";
import CourseDetailPage from "../pages/contents/course-detail-page.jsx";
import AboutPage from "../pages/contents/aboutpage.jsx";
import CoursePage from "../pages/contents/Course/CoursePage";
import HomePage from "../pages/contents/HomePage";
import BlogPage from "../pages/contents/BlogPage";
import LecturerPage from "../pages/contents/LecturerPage";
import PhysicsPage from "../pages/contents/PhysicsPage";
import MathPage from "../pages/contents/MathPage";
import BiologyPage from "../pages/contents/BiologyPage";
import KhmerPage from "../pages/contents/KhmerPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/វគ្គសិក្សា"
          element={
            <MainLayout>
              <CoursePage />
            </MainLayout>
          }
        />
        <Route
          path="/គ្រូបង្រៀន"
          element={
            <MainLayout>
              <LecturerPage />
            </MainLayout>
          }
        />
        <Route
          path="/អំពីពួកយើង"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/មាតិកា"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />
        <Route
          path="/allcourse"
          element={
            <MainLayout>
              <AllCoursePage />
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
        <Route
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
        />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/វគ្គសិក្សា/${lessonId}" element={<AllCoursePage />} />
      </Routes>
    </Router>
  );
}
