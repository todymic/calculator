import React, {useState} from "react";
import useAuth from "./AuthProvider";
import {ILoginForm} from "../services/Auth.service";
import {useAppDispatch, useAppSelector} from "../redux/Hook";
import {openAlert} from "../redux/AlertSlice";
import {AuthDialogProps} from "../components/layout/AuthDialog";
import {signInForm} from "../redux/LoginSlice";
import {LoginForm} from "../components/layout/LoginForm";
import * as Helper from "../utils/Helper";


export const Register = (props: AuthDialogProps) => {

    const {setDialogOpen} = props
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const dispatch = useAppDispatch();
    const {signUp, loading, user} = useAuth();

    /**
     * Get Input data value and Submit form and closeOpen
     */
    const onSubmitForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const payload: ILoginForm = {
            email: email,
            password: password
        }

        signUp(payload);

        dispatch(openAlert('Register Successfull'));
    }

    const signIn = () => {
        dispatch(signInForm())
    }

    if(!loading && !Helper.isEmpty(user)) {
        setDialogOpen(false)
    }

    return (
        <LoginForm
            title="Register"
            onSubmitForm={onSubmitForm}
            goToForm={signIn}
            linkText={"Have already an account? Sign In"}
            setEmail={setEmail}
            setPassword={setPassword}
            labelSubmitBtn={"Sign Up"}
        />

    )

}