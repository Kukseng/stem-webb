import { apiSlice } from './api-slice';

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (articleData) => ({
        url: 'articles/',
        method: 'POST',
        body: articleData,
        headers: articleData instanceof FormData ? {} : { 'Content-Type': 'application/json' }, // Handle FormData correctly
      }),
      invalidatesTags: ['Article'],
    }),
    getAllArticles: builder.query({
      query: ({ page = 1, search = '', ordering = '' }) => {
        let url = `articles/?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (ordering) url += `&ordering=${ordering}`;
        return url;
      },
      providesTags: ['Article'],
    }),
    getArticleById: builder.query({
      query: (id) => `articles/${id}/`,
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