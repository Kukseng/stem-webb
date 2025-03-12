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
    getCategoryById: builder.query({
      query: (id) => `categories/${id}/`, // Fetch category by ID
      providesTags: (result, error, id) => [{ type: "Category", id }], // Tag specific category
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery, // Export the new hook
} = categoryApi;