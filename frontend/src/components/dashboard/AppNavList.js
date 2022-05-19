import * as React from 'react';
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
import {useAuthUser} from "react-auth-kit";

const AppNavList = () => {
    const navigate = useNavigate();
    let {pathname} = useLocation();
    const auth = useAuthUser()

    pathname = "/" + pathname.replace(/^\/([^\/]*).*$/, '$1');

    const navRoutes = routes
        .filter((r) => r.dashboard)
        .filter((r) => {
            for (const role of auth().roles) {
                if (r.dashboard.roles.indexOf(role) != -1) {
                    return true;
                }
            }
            return false;
        });

    return (
        <React.Fragment>
            <List>
                {
                    navRoutes.map((r, i) => {

                        return pathname != r.path ?
                            <ListItemButton onClick={() => navigate(r.path)} key={i}>
                                <ListItemIcon>
                                    {r.dashboard.icon}
                                </ListItemIcon>
                                <ListItemText primary={r.dashboard.title}/>
                            </ListItemButton>
                            :
                            <ListItemButton
                                key={i}
                                onClick={() => navigate(r.path)}
                                sx={{background: '#bbdefb', color: '#448aff'}}
                            >
                                <ListItemIcon sx={{color: "#448aff"}}>
                                    {r.dashboard.icon}
                                </ListItemIcon>
                                <ListItemText primary={r.dashboard.title}/>
                            </ListItemButton>;
                    })
                }

            </List>
        </React.Fragment>
    );
}

export default AppNavList;
