import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/contents/HomePage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import LecturerPage from "../pages/contents/LecturerPage";
import CoursePage from "../pages/contents/CoursePage";
import LoginForm from "../pages/auth/LoginFrom";
import MathPage from "../pages/contents/MathPage";
import PhysicsPage from "../pages/contents/PhysicsPage";
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
          path="/ចូលគណី"
          element={
            <MainLayout>
              <LoginForm />
            </MainLayout>
          }
        />
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
        <Route
          path="/Physic"
          element={
            <MainLayout>
              <KhmerPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
