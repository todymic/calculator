import {AlertColor, Snackbar} from "@mui/material";
import React, {FC} from "react";
import {SnackbarCloseReason, SnackbarOrigin} from "@mui/material/Snackbar/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface NotificationProps {
    open: boolean,
    onClose: (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void,
    message: string | null,
    origin?: SnackbarOrigin,
    type?: AlertColor
}

export const Notification = (props: NotificationProps) => {
    const {open, onClose, message, origin, type} = props;

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={5000}
            anchorOrigin={origin}
        >
            <Alert severity={type} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}
