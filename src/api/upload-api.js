// src/api/fileApi.js
import { apiSlice } from './apiSlice';

export const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (fileData) => ({
        url: 'upload/',
        method: 'POST',
        body: fileData,
        headers: {
          'Content-Type': undefined,
        },
      }),
      invalidatesTags: ['File'],
    }),
    getFileByUuid: builder.query({
      query: (uuid) => `upload/${uuid}`,
      providesTags: ['File'],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFileByUuidQuery,
} = fileApi;