// src/api/forumApi.js
import { apiSlice } from './api-slice';



export const forumApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createForum: builder.mutation({
      query: (forumData) => ({
        url: 'forums/',
        method: 'POST',
        body: forumData,
      }),
      invalidatesTags: ['Forum'],
    }),
    getAllForums: builder.query({
      query: () => 'forums/',
      providesTags: ['Forum'],
    }),
    getForumById: builder.query({
      query: (id) => `forums/${id}`,
      providesTags: ['Forum'],
    }),
    updateForum: builder.mutation({
      query: ({ id, ...forumData }) => ({
        url: `forums/${id}/`,
        method: 'PUT',
        body: forumData,
      }),
      invalidatesTags: ['Forum'],
    }),
    deleteForum: builder.mutation({
      query: (id) => ({
        url: `forums/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Forum'],
    }),
   replyToForum: builder.mutation({
  query: (commentData) => ({
    url: 'comments/',
    method: 'POST',
    body: commentData,
  }),
  invalidatesTags: ['Forum', 'Comment'], // This should trigger refetch
}),
    getAllComments: builder.query({
      query: () => 'comments/',
      providesTags: ['Comment'],
    }),
  }),
});

export const {
  useCreateForumMutation,
  useGetAllForumsQuery,
  useGetForumByIdQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useReplyToForumMutation,
  useGetAllCommentsQuery,
} = forumApi;