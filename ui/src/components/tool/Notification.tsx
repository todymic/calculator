import {Snackbar} from "@mui/material";
import React from "react";
import {SnackbarOrigin} from "@mui/material/Snackbar/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification = (props: any) => {
    const origin: SnackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
    }
    return (
        <Snackbar
            open={props.open}
            onClose={props.onClose}
            autoHideDuration={2000}
            anchorOrigin={origin}
        >
            <Alert severity="success" sx={{width: '100%'}}>
                {props.messageAlert}
            </Alert>
        </Snackbar>
    )
}
