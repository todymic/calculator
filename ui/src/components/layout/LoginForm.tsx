import {Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import React, {SetStateAction, useState} from "react";
import useAuth from "../../auth/AuthProvider";
import {ILoginForm} from "../../services/Auth.service";

export const LoginForm = ({setOpen}: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {loading, error, login} = useAuth();

    const onSubmitForm = () => {
        const payload: ILoginForm = {
            email: email,
            password: password
        }
        login(payload);
        setOpen(false);
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password)
    }
    return (
        <Box>
            <DialogTitle textAlign="center" sx={{ m: 0, p: 2 }}>Login</DialogTitle>
            <DialogContent dividers>
                <Grid container
                      spacing={3}
                      direction={'column'}
                      justifyContent="center"
                      alignItems="center"
                >
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            required
                            id="email"
                            label="Email"
                            variant="standard"
                            type="email"
                            onChange={e => handleEmailChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={e => handlePasswordChange(e.target.value)}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={onSubmitForm}>Login</Button>
            </DialogActions>
        </Box>
    )
}