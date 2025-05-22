import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeReducer from './themeSlice'; // Import your themeSlice

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeReducer, // Include themeReducer in your store
  },
});

export default store;
