// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/api-slice';
import authReducer from '../services/authSlice.js';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_API_ENDPOINT !== 'production',
});
