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
      query: (id) => `categories/${id}/`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getCategoriesByCourse: builder.query({
      query: (courseId) => `categories/?course=${courseId}`,
      transformResponse: (response) => response.results || [],
      providesTags: (result, error, courseId) =>
        Array.isArray(result) && result.length > 0
          ? result.map(({ id }) => ({ type: "Category", id }))
          : [{ type: "Category", id: courseId }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryByIdMutation,
  useGetCategoriesByCourseQuery,
} = categoryApi;