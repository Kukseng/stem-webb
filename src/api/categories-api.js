// src/api/categoryApi.js
import { apiSlice } from "./api-slice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "categories/",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query({
      query: () => "categories/",
      providesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoriesQuery } =
  categoryApi;
