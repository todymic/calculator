import {
    AlertColor,
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import React, {SetStateAction, useState} from "react";
import useAuth from "../../auth/AuthProvider";
import {ILoginForm} from "../../services/Auth.service";
import {Notification} from "../tool/Notification";

export interface LoginFormProposInterface {
    setOpenDialog: (state: SetStateAction<boolean>) => void
}
export const LoginForm = ({setOpenDialog}: LoginFormProposInterface) => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {loading, error, login} = useAuth();

    /**
     * Get Input data value and Submit form and closeOpen
     */
    const onSubmitForm = () => {
        const payload: ILoginForm = {
            email: email,
            password: password
        }
        login(payload);

        setAlertOpen(true);
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password)
    }

    /**
     * Notification component
     * handleAlertClose
     * @param event
     * @param reason
     */
    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Box>
            <Notification open={ !loading && alertOpen } onClose={handleAlertClose} message={error ? error : "successfully logged!"} origin={{
                vertical: 'top',
                horizontal: 'center',
            }} type={ error ? "error" : "success" }></Notification>

            <DialogTitle textAlign="center" sx={{ m: 0, p: 2 }}>Login</DialogTitle>
            <DialogContent dividers>
                <Grid container
                      spacing={3}
                      direction={"column"}
                      justifyContent="center"
                >
                    <Grid item xs={8} >
                        <TextField
                            autoFocus
                            required
                            id="email"
                            label="Email"
                            variant="standard"
                            type="email"
                            fullWidth
                            onChange={e => handleEmailChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={8} >
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"

                            onChange={e => handlePasswordChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" type="submit" onClick={onSubmitForm}>Login</Button>
                    </Grid>


                </Grid>
            </DialogContent>

        </Box>
    )
}