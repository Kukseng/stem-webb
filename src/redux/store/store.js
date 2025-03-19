// src/redux/store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../../api/auth-api";
import authReducer from "../services/authSlice";
import { PersistGate } from "redux-persist/integration/react"; // Correct import path

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Ensure this matches the reducer key
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistedAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authApi.middleware),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Export PersistGate for use in main.jsx
export { PersistGate };