import {createTheme} from '@mui/material/styles';


import React, {useState} from "react";
import useAuth from "./AuthProvider";
import {ILoginForm} from "../services/Auth.service";
import {useAppDispatch} from "../redux/Hook";
import {openAlert} from "../redux/AlertSlice";
import {AuthDialogProps} from "../components/layout/AuthDialog";
import {signUpForm} from "../redux/LoginSlice";
import {LoginForm} from "../components/layout/LoginForm";

export const Login = (props: AuthDialogProps) => {

    const {setDialogOpen} = props
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {login} = useAuth();

    /**
     * Get Input data value and Submit form and closeOpen
     */
    const onSubmitForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const payload: ILoginForm = {
            email: email,
            password: password
        }
        login(payload);

        dispatch(openAlert('Login Successfull'));
    }

    const signUp = () => {
        dispatch(signUpForm())
    }

    return (
        <LoginForm
            title="Login"
            onSubmitForm={onSubmitForm}
            goToForm={signUp}
            linkText={"Don't have an account? Sign Up"}
            setEmail={setEmail}
            setPassword={setPassword}
            labelSubmitBtn={"Sign In"}
        />
    )
}