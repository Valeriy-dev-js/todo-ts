import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from '../../axiosConfig';

interface User {
  name: string;
  password: string;
}
interface AuthState extends User {
  isLogined: boolean;
  isSignup: boolean;
}

export const login: any = createAsyncThunk(
  'auth/login', 
  async (user: User) => {
    const res = await axios.post('login', user);
    return res.data;
});

export const signup: any = createAsyncThunk(
  'auth/signup',
  async (user: User) => {
    const res = await axios.post('signup', user);
    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    password: '',
    isLogined: false,
    isSignup: true
  } as AuthState,
  reducers: {
    toggleLogin(state) {
      state.isLogined = !state.isLogined;
    },
    toggleSignup(state){
      state.isSignup = !state.isSignup;
    },
    setUserName(state, acton) {
      state.name = acton.payload;
    },
    setUserPassword(state, acton) {
      state.password = acton.payload;
    },
    signout(state){
      state.name = '';
      state.password = '';
      state.isLogined = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('name', state.name)
      state.isLogined = true;
    },
    [signup.fulfilled]: (state, action) => {

    }
  },
});

export const { signout, toggleSignup, toggleLogin, setUserName, setUserPassword } = authSlice.actions;
export const selectIsLogined = (state: RootState) => state.auth.isLogined;
export const selectName = (state: RootState) => state.auth.name;
export const selectPassword = (state: RootState) => state.auth.password;
export const selectIsSignup = (state: RootState) => state.auth.isSignup;
export default authSlice.reducer;

