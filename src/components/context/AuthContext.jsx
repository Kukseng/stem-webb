// src/components/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileQuery, useRefreshTokenMutation } from "../../api/auth-api"; // Adjust import path
import { setCredentials, logout as logoutAction } from "../../redux/services/authSlice"; // Adjust import path
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Restore tokens from localStorage on app load
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");

    if (storedAccessToken && storedRefreshToken) {
      // Restore tokens to Redux state
      dispatch(setCredentials({ access: storedAccessToken, refresh: storedRefreshToken }));
    } else {
      setIsLoading(false); // No tokens found, finish loading
    }
  }, [dispatch]);

  // Set user and fetch profile when tokens are available
  const { data: profileData, error: profileError } = useGetProfileQuery(undefined, {
    skip: !accessToken, // Skip query if no token
  });

  useEffect(() => {
    console.log("AuthContext useEffect triggered:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      setUser({ accessToken, refreshToken });

      // Set profile if fetched successfully
      if (profileData) {
        setProfile(profileData);
      }

      // Handle profile fetch error (e.g., token expired)
      if (profileError) {
        console.error("Profile fetch error:", profileError);
        if (profileError.status === 401) {
          // Attempt to refresh token
          refreshTokenMutation({ refresh: refreshToken })
            .unwrap()
            .then((response) => {
              const { access } = response;
              dispatch(setCredentials({ access, refresh: refreshToken }));
              localStorage.setItem("access_token", access);
            })
            .catch((err) => {
              console.error("Token refresh failed:", err);
              handleLogout(); // Logout if refresh fails
            });
        }
      }
    } else {
      setUser(null);
      setProfile(null);
    }

    setIsLoading(false); // Finish loading
  }, [accessToken, refreshToken, profileData, profileError, dispatch, refreshTokenMutation]);

  // Login function
  const login = (tokens, userProfile) => {
    const { access, refresh } = tokens;
    dispatch(setCredentials({ access, refresh }));
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setUser({ accessToken: access, refreshToken: refresh });
    setProfile(userProfile);
  };

  // Logout function
  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setProfile(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, setProfile, login, logout: handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};