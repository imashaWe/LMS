import * as React from "react";
import {Typography, Avatar, IconButton, Box, Menu, MenuItem, Tooltip, Divider} from "@mui/material";
import {Person} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import {stringToColor} from "../../helpers/functions";


function UserMenu() {
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const signOut = useSignOut()
    const auth = useAuthUser()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut();
    }
    const fullName = `${auth().firstName}  ${auth().lastName}`;
    if (!isAuthenticated) {
        return <React.Fragment/>
    }

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleClick} sx={{p: 0}}>
                    <Avatar
                        alt={fullName}
                        src="/static/images/avatar/2.jpg"
                        sx={{bgcolor: stringToColor(fullName)}}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem >{auth().lastName}</MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
    return (

        <React.Fragment>

            <Typography>
                Developer
            </Typography>
            <IconButton
                color="inherit"
                onClick={handleClick}
            >
                <Person/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

            </Menu>
        </React.Fragment>
    );
}

export default UserMenu;