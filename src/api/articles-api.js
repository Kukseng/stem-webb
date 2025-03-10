// src/api/articleApi.js
import { apiSlice } from './apiSlice';

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
      query: () => 'articles/',
      providesTags: ['Article'],
    }),
    getArticleById: builder.query({
      query: (id) => `articles/${id}`,
      providesTags: ['Article'],
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