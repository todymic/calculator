import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InputInterface, ResultInterface} from "../types/Calcul.Interface";

export interface ScreenValue {
    input: string,
    result: ResultInterface | string,
    ans: string,
    formattedInput: InputInterface
}

const initialState: ScreenValue = {
    input: '0',
    result: '',
    ans: '',
    formattedInput: {
        "input": '0'
    }
}

export const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        inputScreen: (state, action: PayloadAction<string>) => {
            state.input = action.payload
        },
        resultScreen: (state, action: PayloadAction<ResultInterface | string>) => {
            state.result = action.payload
        },
        ansScreen: (state, action: PayloadAction<string>) => {
            state.ans = action.payload
        },
        setFormattedInput: (state, action: PayloadAction<InputInterface>) => {
            state.formattedInput = action.payload
        },
        reset: state => {
            return initialState;
        }
    }
})

export const {inputScreen, resultScreen, ansScreen, setFormattedInput, reset} = screenSlice.actions

export default screenSlice.reducer;