import React, {useEffect, useState} from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Fab, Link, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {FormContainer, SelectElement, TextFieldElement} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";
import {useApi} from "../../../helpers/hookes/useApi";
import {parseFormData, parseMessage} from "../../../helpers/functions";
import {useForm} from "react-hook-form";
import {FileUploader} from "react-drag-drop-files";
import jwt_decode from "jwt-decode";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function CourseCreate() {

    const api = useApi();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [subjects, setSubject] = useState([]);
    const [levels,setLevel] = useState([])
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const {state} = useLocation();
let defaultValues;
if (state) {
    defaultValues =state.data;
}


    const handleChange = (file) => {
        setFile(file);
    };
    const onSubmit = (data) => {
        const formData = parseFormData(data);
        formData.append("thumbnail", file);
        setLoading(true);
        setError(null);
        api.post('course', formData).then((r) => {
            navigate("/lecturer/courses")
        })
            .catch((e) => setError(parseMessage(e)))
            .finally(() => setLoading(false));
    }

    const init = () => {
        api.get('basicdata',).then((r) => {
            setSubject(r.data.subjects.map((d) => {
                d.title = d.subject;
                return d;
            }))
            setLevel(r.data.levels.map((d) => {
                d.title = d.level;
                return d;
            }))
        });
    }
    useEffect(() => {
        init();
    }, [])
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
                    marginX: 16,
                    marginY: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <FormContainer onSuccess={onSubmit} defaultValues={defaultValues}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <label>Title:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="title" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Duration:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="duration" fullWidth size='small' type='number' required/>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Subject:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <SelectElement
                                name="subjectID"
                                size="small"
                                fullWidth
                                required
                                label="Select"
                                options={subjects}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label>Level:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <SelectElement
                                name="levelID"
                                size="small"
                                fullWidth
                                required
                                label="Select"
                                options={levels}
                            />
                        </Grid>
                        <Grid item xs={3}>Thumbnail:</Grid>
                        <Grid item xs={9}>
                            <FileUploader handleChange={handleChange} types={["JPG", "PNG", "GIF"]} maxSize={8}/>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Description:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="description" fullWidth multiline rows={5} required/>
                        </Grid>

                    </Grid>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2, float: 'right'}}
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
