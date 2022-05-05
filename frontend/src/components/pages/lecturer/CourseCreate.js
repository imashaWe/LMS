import React, {useState} from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Fab, Link, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {FormContainer, SelectElement, TextFieldElement} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";

function CourseCreate(){

    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/lecturer/courses">
                    Courses
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
                            <label>Title:</label>
                        </Grid>
                        <Grid item xs={10}>
                            <TextFieldElement name="title" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Subject:</label>
                        </Grid>
                        <Grid item xs={4}>
                            <SelectElement
                                name="subject"
                                size="small"
                                fullWidth
                                required
                                options={[
                                    {
                                        id: '1',
                                        title: 'Label 1'
                                    },
                                    {
                                        id: '2',
                                        title: 'label 2'
                                    }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <label>Duration:</label>
                        </Grid>
                        <Grid item xs={4}>
                            <TextFieldElement name="duration" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={12}>
                            <label>Description:</label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldElement name="description" fullWidth multiline rows={5} required/>
                        </Grid>

                    </Grid>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        loading={loading}
                    >
                        Save
                    </LoadingButton>
                </FormContainer>
            </Box>

        </Box>
    );
}

export default CourseCreate;
