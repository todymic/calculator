import React, {SetStateAction, useState} from "react";
import {Dialog, DialogProps} from "@mui/material";
import {LoginForm} from "../../auth/LoginForm";
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import RegisterForm from "../../auth/RegisterForm";
import {Notification} from "../tool/Notification";
import useAuth from "../../auth/AuthProvider";
import {useAppDispatch, useAppSelector} from "../../redux/Hook";
import {close} from "../../redux/AlertSlice";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AuthDialog = (props: DialogProps) => {

    const dispatch = useAppDispatch()

    const alert = useAppSelector(state => state.alert);

    const {loading, error} = useAuth();

    const handleClose = () => {
        dispatch(close());
    };

    return (
        <>
            <Notification open={!loading && alert.isOpen}
                          message={error ? error : alert.message}
                          origin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }} type={error ? "error" : "success"}
                          onClose={handleClose}
            ></Notification>
            <Dialog {...props}
                    TransitionComponent={Transition}
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                    maxWidth="sm"
            >
                <LoginForm/>
                <RegisterForm/>
            </Dialog>
        </>
    )


}


export default AuthDialog;