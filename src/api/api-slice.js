// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stem-api.istad.co/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers; 
    },
  }),
  tagTypes: [
    'Auth', 'Forum', 'Article', 'Course', 'Category', 'Lesson', 
    'Section', 'Content', 'Comment', 'Follow', 'File'
  ],
  endpoints: () => ({}),
});