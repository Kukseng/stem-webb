// src/api/sectionApi.js
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
  }),
});

export const { useCreateSectionMutation } = sectionApi;
