import * as React from 'react';
import {Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import {useNavigate} from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const AppNavList = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <List>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/course")}>
                    <ListItemIcon>
                        <MenuBookIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Courses"/>
                </ListItemButton>
            </List>
            <Divider sx={{my: 1}}/>
            <List>
                <ListItemButton onClick={() => navigate("/blank")}>
                    <ListItemIcon>
                        <GroupRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItemButton>
            </List>
        </React.Fragment>
    );
}

export default AppNavList;