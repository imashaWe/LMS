import {ListItemButton, ListItemIcon, ListItemText, Divider, List} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import {useNavigate} from "react-router-dom";
import * as React from "react";

function LecturerNavigation() {
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
            </List>
            <Divider sx={{my: 1}}/>
            <List>
                <ListItemButton onClick={() => navigate("/blank")}>
                    <ListItemIcon>
                        <GroupRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Lecturer"/>
                </ListItemButton>
            </List>
        </React.Fragment>
    );
}

export default LecturerNavigation;