import { apiSlice } from "./api-slice";

export const coursesApi = apiSlice.injectEndpoints({
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
    deleteCourseByUuid: builder.mutation({
      query: (uuid) => ({
        url: `courses/${uuid}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseByUuid: builder.query({
      query: (uuid) => `courses/${uuid}/`,
      providesTags: (result, error, uuid) => [{ type: "Course", id: uuid }],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseByUuidMutation,
  useGetCourseByUuidQuery,
} = coursesApi;