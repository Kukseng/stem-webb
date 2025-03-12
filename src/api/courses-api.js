// src/api/courseApi.js
import { apiSlice } from "./api-slice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => "courses/",
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "courses/",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourseByUuid: builder.mutation({
      query: ({ uuid, ...courseData }) => ({
        url: `courses/${uuid}/`,
        method: "PUT",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourseByUuid: builder.mutation({
      query: (uuid) => ({
        url: `courses/${uuid}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseByUuid: builder.query({
      query: (uuid) => `courses/${uuid}/`, // Fixed to match the correct endpoint
      providesTags: (result, error, uuid) => [{ type: "Course", id: uuid }],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseByUuidMutation,
  useDeleteCourseByUuidMutation,
  useGetCourseByUuidQuery,
} = courseApi;