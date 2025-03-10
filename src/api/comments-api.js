// src/api/commentApi.js
import { apiSlice } from './apiSlice';

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: 'comments/',
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useCreateCommentMutation,
} = commentApi;