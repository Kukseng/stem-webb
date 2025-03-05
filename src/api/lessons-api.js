// src/api/lessonApi.js
import { apiSlice } from "./api-slice";

export const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (lessonData) => ({
        url: "lessons/",
        method: "POST",
        body: lessonData,
      }),
      invalidatesTags: ["Lesson"],
    }),
    getAllLessons: builder.query({
      query: () => "lessons/",
      providesTags: ["Lesson"],
    }),
    getLessonByUuid: builder.query({
      query: (uuid) => `lessons/${uuid}`,
      providesTags: ["Lesson"],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetAllLessonsQuery,
  useGetLessonByUuidQuery,
} = lessonApi;
