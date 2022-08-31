import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Login {
    signUp: boolean, //register
    signIn: boolean //login
}

const initialState: Login = {
    signUp: false,
    signIn: true
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // register form
        signUpForm: state => {
            state.signUp = true;
            state.signIn = false
        },
        // login form
        signInForm: state => {
            state.signUp = false;
            state.signIn = true
        }
    }
})

export const {signUpForm, signInForm} = loginSlice.actions

export default loginSlice.reducer;