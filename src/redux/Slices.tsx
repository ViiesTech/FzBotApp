import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { ShowToast } from '../GlobalFunctions';

// Define types for initial state


const initialState: UserState = {
  userData: {},
  token: '',
  message: '',
  isLoading: false,
  error: null,
};

// Define return type of API response
interface LoginResponse {
  status: string;
  token: string;
  userData: object;
}



export const UserLogin = createAsyncThunk<LoginResponse, AxiosRequestConfig>(
  'auth/UserLogin',
  async (config, { rejectWithValue }) => {
    try {
      const response = await axios.request<LoginResponse>(config);
      const resData = response.data;

      console.log('Login Response ===>', JSON.stringify(resData));

      if (resData.success) {
        if (resData.accessToken && resData.data) {
          ShowToast('success', 'Login Successful');
          return resData;
        } else {
          ShowToast('error', resData.msg);
          return resData; // allow reducer to check for token existence
        }
      } else {
        ShowToast('error', resData?.msg || 'Login failed');
        return rejectWithValue('Login failed');
      }
    } catch (error: any) {
      console.log('Login Error:', error.response?.data?.message || error.message);
      ShowToast('error', error.response?.data?.message || 'Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

// Redux Slice with TypeScript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = '';
      state.userData = {};
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action: PayloadAction<Record<string, any>>) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        if (action.payload.accessToken && action.payload.data) {
          state.token = action.payload.accessToken;
          state.userData = action.payload.data;
          console.log('Login success — token & userData set');
        } else {
          // No token means OTP login initiated — no Redux update needed yet
          console.log('Phone login flow — waiting for OTP verification');
        }
        console.log('action.payload<<<<=====', action.payload);
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // ✅ Ensured `error` is always a string
      });
  },
});

export const { clearToken, setUserData, setToken } = authSlice.actions;
export default authSlice.reducer;
