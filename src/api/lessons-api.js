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
    getLessonsByCategory: builder.query({
      query: (categoryId) => `lessons/?category=${categoryId}`,
      transformResponse: (response) => response.results || [], // Extract 'results' array
      providesTags: (result, error, categoryId) =>
        Array.isArray(result) && result.length > 0
          ? result.map(({ id }) => ({ type: "Lesson", id }))
          : [{ type: "Lesson", id: categoryId }],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetAllLessonsQuery,
  useGetLessonByUuidQuery,
  useGetLessonsByCategoryQuery,
} = lessonApi;