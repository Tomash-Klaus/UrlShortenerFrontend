import React from "react";
import {AppBar, IconButton, Toolbar, Typography, Box} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from '@mui/icons-material/Key';
import useAuthHook from "../hooks/useAuthHook.js";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {isAuthenticated, logout} = useAuthHook();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    };

    const loginHandler = ()=>{
        navigate('/login');
    };

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box sx={{flexGrow: 1, display: "flex", justifyContent: "center"}}>
                    <Typography variant="h6" noWrap component="div">
                        Url shortener
                    </Typography>
                </Box>
                {isAuthenticated ?
                    <IconButton edge="end" color="inherit" aria-label="logout" onClick={logOutHandler}>
                        <LogoutIcon/>
                    </IconButton> :
                    <IconButton edge="end" color="inherit" aria-label="login" onClick={loginHandler}>
                        <KeyIcon/>
                    </IconButton>}
            </Toolbar>
        </AppBar>
    );
};
export default Header;