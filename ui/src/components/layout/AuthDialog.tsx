import React from "react";
import {Dialog, Grid} from "@mui/material";
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

const AuthDialog = (props: any) => {
    const {setOpen} = props;
    return <Dialog {...props}
                TransitionComponent={Transition}
                aria-describedby="alert-dialog-slide-description"
                   fullWidth
            >
            <LoginForm setOpen={setOpen}/>
        </Dialog>

}


export default AuthDialog;