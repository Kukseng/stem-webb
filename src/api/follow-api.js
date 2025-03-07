// src/api/followApi.js
import { apiSlice } from './apiSlice';

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (userUuid) => ({
        url: `follows/${userUuid}/follow_user/`,
        method: 'POST',
      }),
      invalidatesTags: ['Follow'],
    }),
    unfollowUser: builder.mutation({
      query: (userUuid) => ({
        url: `follows/${userUuid}/unfollow_user/`,
        method: 'POST',
      }),
      invalidatesTags: ['Follow'],
    }),
    getTotalFollowers: builder.query({
      query: (userUuid) => `follow/${userUuid}/followers/`,
      providesTags: ['Follow'],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetTotalFollowersQuery,
} = followApi;