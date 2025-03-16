import { apiSlice } from './api-slice';

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (articleData) => ({
        url: 'articles/',
        method: 'POST',
        body: articleData,
      }),
      invalidatesTags: ['Article'],
    }),
    getAllArticles: builder.query({
      query: ({ page = 1 }) => `articles/?page=${page}`, // Updated to support pagination
      providesTags: ['Article'],
    }),
   getArticleById: builder.query({
      query: (id) => `articles/${id}/`, // Add trailing slash to match server expectation
      providesTags: ["Article"],
    }),
    updateArticle: builder.mutation({
      query: ({ id, ...articleData }) => ({
        url: `articles/${id}/`,
        method: 'PUT',
        body: articleData,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `articles/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;