import React, {SetStateAction, useMemo, useState} from "react";
import {Dialog, DialogProps} from "@mui/material";
import {LoginForm} from "../../auth/LoginForm";
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import RegisterForm from "../../auth/RegisterForm";
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
    const {loading, error, user} = useAuth();

    const alert = useAppSelector(state => state.alert);

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
                              vertical: 'top',
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
                <LoginForm open={open} setDialogOpen={setDialogOpen}/>
                <RegisterForm open={open} setDialogOpen={setDialogOpen}/>
            </Dialog>
        </>
    )


}


export default AuthDialog;