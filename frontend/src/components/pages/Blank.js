import React from 'react';
import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";

function Blank() {
    return (
        <React.Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
            <Divider/>
        </React.Fragment>


    );
}

export default Blank;