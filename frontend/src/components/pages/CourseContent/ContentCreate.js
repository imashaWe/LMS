import React, { useState } from "react";
import {Alert, Box, Breadcrumbs, Button, Divider, Fab, Link, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {FormContainer, SelectElement, TextFieldElement} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function ContentCreate() {
    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/courseContent/contents">
                    Contents
                </Link>
                <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>

            <Divider/>

            <Box
                sx={{
                    margin: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <FormContainer onSuccess={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <label>Name:</label>
                        </Grid>
                        <Grid item xs={10}>
                            <TextFieldElement name="name" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={12}>
                            <label>Description:</label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldElement name="description" fullWidth multiline rows={5} required/>
                        </Grid>

                        <Grid item xs={12}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Type: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                        <FormControlLabel value="Document" control={<Radio />} label="Document" />
                        <FormControlLabel value="Video" control={<Radio />} label="Video" />
                        <FormControlLabel value="Assignment" control={<Radio />} label="Assignment" />
                        </RadioGroup>
                        </Grid>

                        <Grid item xs={2}>
                            <label>Due Date/Time:</label>
                        </Grid>
                        <Grid item xs={4}>
                            <TextFieldElement name="dueDate" type="datetime-local" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={12}>
                            <label>File:</label>
                        </Grid>
                        <Grid item xs={12}>
                        <TextFieldElement name="fileName" type="file" accept=".pdf,.doc,.jpg,.ppt,video/*,image/*" fullWidth />
                        </Grid>

                    </Grid>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2,float: 'right'}}
                        loading={loading}
                    >
                        Save
                    </LoadingButton>
                </FormContainer>
            </Box>

        </Box>
    );
}

export default ContentCreate;