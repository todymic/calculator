import React, {SetStateAction, useMemo, useState} from "react";
import {Dialog, DialogProps} from "@mui/material";
import {Login} from "../../auth/Login";
import {Register} from "../../auth/Register";
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Notification} from "../tool/Notification";
import useAuth from "../../auth/AuthProvider";
import {useAppDispatch, useAppSelector} from "../../redux/Hook";
import {closeAlert} from "../../redux/AlertSlice";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface AuthDialogProps extends DialogProps {
    setDialogOpen: (state: SetStateAction<boolean>) => void
}

const AuthDialog = (props: AuthDialogProps) => {

    const {open, setDialogOpen} = props;

    const dispatch = useAppDispatch()
    const {loading, error} = useAuth();

    const alert = useAppSelector(state => state.alert);
    const loginStep = useAppSelector(state => state.login);

    const {signUp, signIn} = loginStep;

    const handleAlertClose = () => {
        dispatch(closeAlert());
    };

    const handleDialogClose = () => {
        setDialogOpen(false)
    }



    return (
        <>
            <Notification open={!loading && alert.isOpen}
                          message={error ? error : alert.message}
                          origin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                          }} type={error ? "error" : "success"}
                          onClose={handleAlertClose}
            ></Notification>
            <Dialog {...props}
                    TransitionComponent={Transition}
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                    maxWidth="sm"
                    onClose={handleDialogClose}
            >
                { signIn && <Login open={open} setDialogOpen={setDialogOpen}/> }
                { signUp && <Register open={open} setDialogOpen={setDialogOpen}/> }

            </Dialog>
        </>
    )


}


export default AuthDialog;