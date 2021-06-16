import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from '../../axiosConfig';

interface User {
  name: string;
  password: string;
}
interface AuthState extends User {
  isLogined: boolean;
}

export const login: any = createAsyncThunk('auth/login', async (user: User) => {
    console.log(user);
    console.log('sdfsdf');
    
  const res = await axios.post('login', user);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    password: '',
    isLogined: false,
  } as AuthState,
  reducers: {
    toggleLogin(state) {
      state.isLogined = !state.isLogined;
    },
    setUserName(state, acton) {
      state.name = acton.payload;
    },
    setUserPassword(state, acton) {
      state.password = acton.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
        console.log(action);
        
      state.isLogined = true;
      console.log(action);
      
    },
    [login.rejected]: (sate, action) => {
        console.log(action);
        
    }
  },
});

export const { toggleLogin, setUserName, setUserPassword } = authSlice.actions;
export const selectIsLogined = (state: RootState) => state.auth.isLogined;
export const selectName = (state: RootState) => state.auth.name;
export const selectPassword = (state: RootState) => state.auth.password;

// export const selectIsSignup = (state: RootState) => state.auth.isSignup;
export default authSlice.reducer;
