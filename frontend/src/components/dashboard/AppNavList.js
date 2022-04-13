import * as React from 'react';
import {ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import {useNavigate} from "react-router-dom";

const AppNavList = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <list>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemButton>
            </list>
            <Divider sx={{my: 1}}/>
            <list>
                <ListItemButton onClick={() => navigate("/users")}>
                    <ListItemIcon>
                        <GroupRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItemButton>
            </list>
        </React.Fragment>
    );
}

export default AppNavList;