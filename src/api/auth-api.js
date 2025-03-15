// src/api/authApi.js
import { apiSlice } from "./api-slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials, // Expects { email, password }
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "register/",
        method: "POST",
        body: userData, // Expects { first_name, last_name, username, email, password, ConfirmPassword }
      }),
    }),
    getProfile: builder.query({
      query: () => "profile/", // Matches Postman
      providesTags: ["Auth"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "profile/",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "verify-otp/",
        method: "POST",
        body: otpData, // Expects { email, otp_code }
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "forgot-password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "reset-password/",
        method: "POST",
        body: resetData,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: "change-password/",
        method: "POST",
        body: { old_password, new_password },
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.mutation({
      query: (refreshData) => ({
        url: "refresh/",
        method: "POST",
        body: refreshData,
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
  useRefreshTokenMutation,
} = authApi;