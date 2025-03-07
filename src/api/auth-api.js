// src/api/authApi.js
import { apiSlice } from './api-slice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => 'profile',
      providesTags: ['Auth'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: 'profile/',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: 'verify-otp/',
        method: 'POST',
        body: otpData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
} = authApi;