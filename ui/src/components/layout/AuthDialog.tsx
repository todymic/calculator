import React from "react";
import {DialogContent, DialogTitle, TextField} from "@mui/material";

const AuthDialog = () => {
    return (
        <>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
        </>
    )
}


export default AuthDialog;