import { apiSlice } from "./api-slice";

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (contentData) => ({
        url: "contents/",
        method: "POST",
        body: contentData,
      }),
      invalidatesTags: ["Content"],
    }),
    getContentsBySection: builder.query({
      query: (sectionUuid) => `contents/?section=${sectionUuid}`,
      transformResponse: (response) => response.results || [],
      providesTags: (result, error, sectionUuid) =>
        Array.isArray(result) && result.length > 0
          ? result.map(({ id }) => ({ type: "Content", id }))
          : [{ type: "Content", id: sectionUuid }],
    }),
    deleteContentByUuid: builder.mutation({
      query: (uuid) => ({
        url: `contents/${uuid}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useGetContentsBySectionQuery,
  useDeleteContentByUuidMutation,
} = contentApi;