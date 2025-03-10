import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_API_ENDPOINT }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "courses",
    }),
    getCourseById: builder.query({
      query: (id) => `courses/${id}`,
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = api;
export default api;
