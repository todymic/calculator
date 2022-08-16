import React, {SetStateAction} from "react";
import {Dialog, DialogProps} from "@mui/material";
import {LoginForm} from "./LoginForm";
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AuthDialogPropsInterface extends DialogProps {
    setOpenDialog: (state: SetStateAction<boolean>) => void
}


const AuthDialog = (props: AuthDialogPropsInterface) => {
    const {setOpenDialog} = props;

    return <Dialog {...props}
                   TransitionComponent={Transition}
                   aria-describedby="alert-dialog-slide-description"
                   fullWidth
                   maxWidth="sm"
            >
            <LoginForm setOpenDialog={setOpenDialog}/>
        </Dialog>

}


export default AuthDialog;