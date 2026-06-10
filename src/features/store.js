
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials } from './auth/authSlice';
import productsReducer from './products/productsSlice';
import { baseApi } from './baseApi';
import listingFormReducer from '../features/listing/listingFormSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    listingForm: listingFormReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

const initializeAuth = () => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    try {
      const { user, token } = JSON.parse(storedAuth);
      if (user && token) {
        store.dispatch(setCredentials({ user, token }));
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      localStorage.removeItem('auth');
    }
  }
};

initializeAuth();

export default store;