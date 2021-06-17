import { createSlice } from '@reduxjs/toolkit';
import { Alert } from './interfaces';
import { RootState } from './store';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {} as Alert,
  reducers: {
    setAlert(state, action) {
      state.isAlert = false;
      state.isAlert = action.payload.isAlert;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    setIsAlert(state, action) {
      state.isAlert = action.payload;
    },
  },
});

export const { setAlert, setIsAlert } = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert;
export default alertSlice.reducer;
