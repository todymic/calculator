import Container from "@mui/material/Container";
import {Avatar, Box, Button, CssBaseline, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import React, {ReactEventHandler, SetStateAction, useState} from "react";
import {createTheme} from "@mui/material/styles";
import * as Helper from "../../utils/Helper";
import CalculatorService from "../../services/Calculator.service";
import {useAppSelector} from "../../redux/Hook";
import useAuth from "../../auth/AuthProvider";

const theme = createTheme();

interface LoginFormProps {
    title: string,
    onSubmitForm: ReactEventHandler,
    linkText: string,
    goToForm: ReactEventHandler,
    labelSubmitBtn: string,
    setEmail: (state: SetStateAction<string>) => void,
    setPassword: (state: SetStateAction<string>) => void,
}
export const LoginForm = (props: LoginFormProps) => {

    const screen = useAppSelector(state => state.screen);
    const {title, onSubmitForm, linkText, goToForm, setEmail, setPassword, labelSubmitBtn} = props;

    const {user} = useAuth();

    const handleEmailChange = (value: string) => {
        setEmail(value)
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password)
    }

    if (!Helper.isEmpty(user)) {
        CalculatorService.calculRequest(user, screen)
    }

  return (
      <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'}}
              >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      {title}
                  </Typography>
                  <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          onChange={e => handleEmailChange(e.target.value)}
                      />
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={e => handlePasswordChange(e.target.value)}
                      />

                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                      >
                          {labelSubmitBtn}
                      </Button>
                      <Grid container>
                          <Grid item xs>
                              <Link href="#" variant="body2">

                              </Link>
                          </Grid>
                          <Grid item>
                              <Link component="button" variant="body2" onClick={goToForm}>
                                  {linkText}
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
  )
}