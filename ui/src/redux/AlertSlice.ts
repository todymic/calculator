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
        open: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.message = action.payload
        },
        close: state => {
            state.isOpen = false
        }
    }
})

export const {open, close} = alertSlice.actions

export default alertSlice.reducer;