import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Add profile state

  useEffect(() => {
    console.log("AuthContext useEffect triggered:", { accessToken, refreshToken });
    if (accessToken) {
      setUser({ accessToken, refreshToken });
    } else {
      setUser(null);
      setProfile(null); // Clear profile when user logs out
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};