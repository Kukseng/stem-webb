import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/contents/HomePage";
import AboutPage from "../pages/contents/AboutPage";
import BlogPage from "../pages/contents/BlogPage";
import LecturerPage from "../pages/contents/LecturerPage";
import CoursePage from "../pages/contents/CoursePage";
import SigninComponent from "../components/signupAndSignin/SigninComponent";
import SignupComponent from "../components/signupAndSignin/SignupComponent";
import ForgotPassword from "../components/signupAndSignin/ForgotPasswordComponent";
import LoginPage from "../pages/auth/loginPage";

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

        <Route path="/ចូលគណនី" element={ <LoginPage/> } />
        
        {/* <Route path="/ចូលគណនី" element={ <SigninComponent/> } /> */}

        <Route path="/ចុះឈ្មោះថ្មី" element={<SignupComponent />} />

        <Route path="/ភ្លេចលេខសម្ងាត់" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
