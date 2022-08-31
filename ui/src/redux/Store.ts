import {configureStore} from '@reduxjs/toolkit'
import alertReducer from "./AlertSlice";
import screenReducer from "./ScreenSlice";
import loginReducer from "./LoginSlice";


export const store = configureStore({
    reducer: {
        alert: alertReducer,
        screen: screenReducer,
        login: loginReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch