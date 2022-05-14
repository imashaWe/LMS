import React from 'react';
import {Box, Breadcrumbs, Button, Divider, Fab, Link, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {fabStyle} from "../../config/style";
import {useAppLoading} from "../../providers/AppLoading";
import {useSnackbar} from "material-ui-snackbar-provider";

function Blank() {
    const setAppLoading = useAppLoading();
    const snackbar = useSnackbar()

    const handleSomething = () => {
        snackbar.showMessage(
            'Something happened!',
        )
    }

    return (
        <Box>

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

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle}>
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>
<Button onClick={()=>handleSomething()}>Click</Button>
        </Box>


    );
}

export default Blank;