import React from 'react';
import {Box, Breadcrumbs, Divider, Fab, Link, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {fabStyle} from "../../../config/style";

function Course() {
    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link underline="hover" color="inherit" href="/">
                    Core
                </Link>
                <Typography color="text.primary">Course</Typography>
            </Breadcrumbs>

            <Divider/>

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle}>
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>

        </Box>


    );
}

export default Course;