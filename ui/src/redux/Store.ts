import {configureStore} from '@reduxjs/toolkit'
import alertReducer from "./AlertSlice";
import screenReducer from "./ScreenSlice";


export const store = configureStore({
    reducer: {
        alert: alertReducer,
        screen: screenReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch