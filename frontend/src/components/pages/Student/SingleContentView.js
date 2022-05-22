import {useApi} from "../../../helpers/hookes/useApi";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppMessage} from "../../../providers/AppMessage";
import {parseMessage} from "../../../helpers/functions";
import {Alert, Box, Breadcrumbs, Button, Divider, Grid, Link, Typography} from "@mui/material";
import {CheckboxButtonGroup, FormContainer} from "react-hook-form-mui";
import DueTimeText from "../../common/DueTimeText";
import FileUploader from "../../common/FileUploader";
import {LoadingButton} from "@mui/lab";

function SingleContentView() {

    const {state} = useLocation();
    const appMessage = useAppMessage();
    const navigate = useNavigate();

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/course/content">
                    {state.data.course.title}
                </Link>
                <Typography color="text.primary">{state.data.name}</Typography>
            </Breadcrumbs>
            <Divider/>
            <Box
                sx={{
                    marginX: 16,
                    marginY: 8,
                }}>

                <Grid container>
                    <Grid item xs={12}>
                        <Typography varaint="h6" sx={{margin: '15px'}}>{state.data.description}</Typography>

                        <Button variant="outlined" size="small" sx={{margin: '10px'}}
                                href={state.data.fileURL}>Download</Button>

                        <Typography variant="h6" sx={{margin: '15px'}}><DueTimeText
                            date={state.data.dueDate}/></Typography>
                    </Grid>

                </Grid>


            </Box>
        </Box>);

}

export default SingleContentView