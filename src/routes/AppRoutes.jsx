import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/contents/HomePage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import LecturerPage from "../pages/contents/LecturerPage";
import CoursePage from "../pages/contents/AllCoursePage";
import AuthForm from "../pages/auth/loginPage";
import SigupPage from "../pages/auth/sigupPage";
import AllCoursePage from "../pages/contents/AllCoursePage";

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
              <LecturerPage/>
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
      <Route
        path="/ចូលគណនី"
        element={
          <MainLayout>
          <SigupPage/>
          </MainLayout>
        }
        />
         <Route
        path="/វគ្គសិក្សា"
        element={
          <MainLayout>
          <AllCoursePage/>
          </MainLayout>
        }
        />
      </Routes>
    </Router>
  );
}
