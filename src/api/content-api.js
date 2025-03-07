// src/api/contentApi.js
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
  }),
});

export const { useCreateContentMutation } = contentApi;
