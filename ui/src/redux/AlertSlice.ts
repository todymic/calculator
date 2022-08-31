import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Alert {
    isOpen: boolean,
    message?: string
}

const initialState: Alert = {
    isOpen: false
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.message = action.payload
        },
        closeAlert: state => {
            state.isOpen = false
        }
    }
})

export const {openAlert, closeAlert} = alertSlice.actions

export default alertSlice.reducer;