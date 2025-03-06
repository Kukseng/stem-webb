import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/contents/homepage";
import AboutPage from "../pages/contents/aboutpage";
import BlogPage from "../pages/contents/blogpage";
import LecturerPage from "../pages/contents/lecturerpage";
import CoursePage from "../pages/contents/allcoursepage";
import AuthForm from "../pages/auth/loginPage";
import SigupPage from "../pages/auth/sigupPage";
import AllCoursePage from "../pages/contents/allcoursepage";
import CourseDetailPage from "../pages/contents/course-detail-page";

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
        {/* <Route path="/" 
                element={
                    <MainLayout>
                        <
                    </MainLayout>
                }
                /> */}
        <Route
          path="/មាតិកា"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />
        <Route path="/ចូលគណនី" element={<SigupPage />} />
        <Route
          path="/វគ្គសិក្សា"
          element={
            <MainLayout>
              <AllCoursePage />
            </MainLayout>
          }
        />

        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/វគ្គសិក្សា/${lessonId}" element={<AllCoursePage/>} />
      </Routes>
    </Router>
  );
}
