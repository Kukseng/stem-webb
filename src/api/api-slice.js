// src/api/api-slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://stem-api.istad.co/api/", // Correct base URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access || localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Forum",
    "Article",
    "Course",
    "Category",
    "Lesson",
    "Section",
    "Content",
    "Comment",
    "Follow",
    "File",
  ],
  endpoints: () => ({}),
});