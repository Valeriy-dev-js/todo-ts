import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Alert {
    isAlert: boolean;
    message: string;
    status: number;
}
const alertSlice = createSlice({
    name: 'alert',
    initialState: {} as Alert,
    reducers:{
        setAlert(state, action : PayloadAction<Alert>){
            state.isAlert = false;
            state.isAlert = action.payload.isAlert;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        setIsAlert(state, action){
            state.isAlert = action.payload;
        }
    }
});

export const { setAlert, setIsAlert } = alertSlice.actions
export const selectAlert = (state: RootState) => state.alert
export default alertSlice.reducer


