import {
    AppBar,
    Box, Button,
    Container,
    IconButton,
    Menu,
    MenuItem, SvgIcon,
    SvgIconProps,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import useAuth from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/Hook";
import {reset} from "../../redux/ScreenSlice";
import AuthDialog from "./AuthDialog";
import * as Helper from "../../utils/Helper";

const settings = [
    'Profile',
    'Logout'
];

const Header = () => {

    const {user, logout} = useAuth();
    const navigate =  useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    //Dialog State
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * Logout and return to Calculator page
     */
    const handleLogout = () => {
        logout()
        setAnchorElUser(null);
        navigate(`/`)
        dispatch(reset())
    }

    const showProfile = () => {
        let currentUserId = user!.id

        if(currentUserId) {
            navigate(`/users/${currentUserId}`)
        }

    }

    const handleLogin = () => {
        setDialogOpen(true);
    }

    function HomeIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }

    /**
     * AuthDialog component
     * Handle onClose event
     * @param message
     */
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    console.log(!Helper.isEmpty(user));
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*<AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>*/}
                        <IconButton color='inherit' aria-label="homepage" onClick={() => navigate('/')}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}></Box>
                        <Box sx={{flexGrow: 0}}>
                            {!Helper.isEmpty(user) ? (
                                <>
                                    <Button color="inherit" onClick={handleOpenUserMenu}>{user!.email}</Button>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting, i) => {
                                            return <MenuItem key={i}
                                                             onClick={setting === 'Logout'
                                                                 ? handleLogout: showProfile }>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        })}
                                    </Menu>
                                </>

                            ) : (
                                <Button color="inherit" onClick={handleLogin}>
                                    Login
                                </Button>
                            )}

                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            <AuthDialog open={dialogOpen} onClose={handleDialogClose} setDialogOpen={setDialogOpen}/>
        </>

    )
}
export default Header;