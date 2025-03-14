
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const istemUrl = import.meta.env.VITE_API_ENDPOINT;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/" ,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;  
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
