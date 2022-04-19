import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Person} from "@mui/icons-material";
import {Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";


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

    if (!isAuthenticated) {
        return <React.Fragment/>
    }

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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default UserMenu;