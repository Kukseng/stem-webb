import { apiSlice } from "./api-slice";

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation({
      query: (sectionData) => ({
        url: "sections/",
        method: "POST",
        body: sectionData,
      }),
      invalidatesTags: ["Section"],
    }),
    getSectionsByLesson: builder.query({
      query: (lessonUuid) => `sections/?lesson=${lessonUuid}`,
      transformResponse: (response) => response.results || [],
      providesTags: (result, error, lessonUuid) =>
        Array.isArray(result) && result.length > 0
          ? result.map(({ id }) => ({ type: "Section", id }))
          : [{ type: "Section", id: lessonUuid }],
    }),
    deleteSectionByUuid: builder.mutation({
      query: (uuid) => ({
        url: `sections/${uuid}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useCreateSectionMutation,
  useGetSectionsByLessonQuery,
  useDeleteSectionByUuidMutation,
} = sectionApi;