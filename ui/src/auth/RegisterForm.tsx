import {Box, Button, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import useAuth from "./AuthProvider";
import {ILoginForm} from "../services/Auth.service";
import {useAppDispatch, useAppSelector} from "../redux/Hook";
import {openAlert} from "../redux/AlertSlice";
import {AuthDialogProps} from "../components/layout/AuthDialog";
import *  as Helper from "../utils/Helper";
import CalculatorService from "../services/Calculator.service";
import { ScreenValue } from "../redux/ScreenSlice";
import { UserInterface } from "../types/User.interface";

const RegisterForm = (props: AuthDialogProps) => {

    const screen = useAppSelector(state => state.screen);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const {user, signUp} = useAuth();

    const handleEmailChange = (value: string) => {
        setEmail(value)
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password)
    }

    /**
     * Get Input data value and Submit form and closeOpen
     */
    const onSubmitForm = () => {
        const payload: ILoginForm = {
            email: email,
            password: password
        }

        signUp(payload);

        dispatch(openAlert('Register Successfull'));
    }

    if (!Helper.isEmpty(user)) {
        CalculatorService.calculRequest(user, screen)
    }


    return (
        <>
            <Box>
                <DialogTitle textAlign="center" sx={{ m: 0, p: 2 }}>Register</DialogTitle>
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
                            <Button variant="contained" type="submit" onClick={onSubmitForm}>Register</Button>
                        </Grid>


                    </Grid>
                </DialogContent>

            </Box>
        </>

    )

}
export default RegisterForm;