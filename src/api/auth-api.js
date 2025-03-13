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
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'forgot-password/',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'reset-password/',
        method: 'POST',
        body: resetData,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: 'change-password/',
        method: 'POST',
        body: { old_password, new_password },
      }),
      invalidatesTags: ['Auth'],
    }),
    googleLogin: builder.mutation({
      query: (token) => ({
        url: 'google-login/',
        method: 'POST',
        body: { token },
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGoogleLoginMutation,
} = authApi;