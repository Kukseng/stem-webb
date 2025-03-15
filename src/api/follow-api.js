// src/api/follow-api.js
import { apiSlice } from "./api-slice"; // Adjust path to your apiSlice

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/follow/${userId}/`, // POST to follow a user
        method: "POST",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Followers", id: userId }],
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `/follow/${userId}/`, // DELETE to unfollow a user
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Followers", id: userId }],
    }),
    getTotalFollowers: builder.query({
      query: (userId) => `/follow/${userId}/followers/`, // GET followers for a user
      providesTags: (result, error, userId) => [{ type: "Followers", id: userId }],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetTotalFollowersQuery,
} = followApi;