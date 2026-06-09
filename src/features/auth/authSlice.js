
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!user && !!token;
      state.role = user?.role || null;
      state.error = null;
      
      if (user && token) {
        localStorage.setItem('auth', JSON.stringify({ user, token }));
        localStorage.setItem('role', user.role || '');
      }
    },
    

    updateUserCredits: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, credits: action.payload };

        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          authData.user.credits = action.payload;
          localStorage.setItem('auth', JSON.stringify(authData));
        }
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem('auth');
      localStorage.removeItem('role');
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    restoreAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.user?.role || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.signUp.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.signUp.matchFulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(authApi.endpoints.signUp.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.data?.message || 'Sign up failed';
      })
      
      .addMatcher(authApi.endpoints.signIn.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
        state.loading = false;
        const { accessToken, user } = action.payload;
        if (accessToken && user) {
          state.token = accessToken;
          state.user = user;
          state.isAuthenticated = true;
          state.role = user.role;
          localStorage.setItem('auth', JSON.stringify({ user, token: accessToken }));
          localStorage.setItem('role', user.role);
        }
      })
      .addMatcher(authApi.endpoints.signIn.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.data?.message || 'Sign in failed';
      })
      
      .addMatcher(authApi.endpoints.verifySignupOtp.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verifySignupOtp.matchFulfilled, (state, action) => {
        state.loading = false;
        const { accessToken, user } = action.payload;
        if (accessToken && user) {
          state.token = accessToken;
          state.user = user;
          state.isAuthenticated = true;
          state.role = user.role;
          localStorage.setItem('auth', JSON.stringify({ user, token: accessToken }));
          localStorage.setItem('role', user.role);
        }
      })
      .addMatcher(authApi.endpoints.verifySignupOtp.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.data?.message || 'OTP verification failed';
      })
      
      .addMatcher(authApi.endpoints.verifyLoginOtp.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verifyLoginOtp.matchFulfilled, (state, action) => {
        state.loading = false;
 
        const { accessToken, user } = action.payload;
        if (accessToken && user) {
          state.token = accessToken;
          state.user = user;
          state.isAuthenticated = true;
          state.role = user.role;
          localStorage.setItem('auth', JSON.stringify({ user, token: accessToken }));
          localStorage.setItem('role', user.role);
          
    
        }
      })
      .addMatcher(authApi.endpoints.verifyLoginOtp.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.data?.message || 'OTP verification failed';
        console.error('OTP verification rejected:', action.error);
      })
      
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.role = null;
        localStorage.removeItem('auth');
        localStorage.removeItem('role');
      });
  },
});

export const { setCredentials, logout, setError, clearError, restoreAuth, updateUserCredits } = authSlice.actions;


export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.role;
export const selectUserCredits = (state) => state.auth.user?.credits || 0;

export default authSlice.reducer;