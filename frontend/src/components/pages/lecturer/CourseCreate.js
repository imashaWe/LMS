import React, {useEffect, useState} from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Fab, Link, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {FormContainer, SelectElement, TextFieldElement} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";
import {useApi} from "../../../helpers/hookes/useApi";
import {parseFormData, parseMessage} from "../../../helpers/functions";
import {useForm} from "react-hook-form";
import {FileUploader} from "react-drag-drop-files";

function CourseCreate() {

    const api = useApi();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [subjects, setSubject] = useState([]);
    const [file, setFile] = useState(null);

    const formContext = useForm({
        defaultValues: {
            title: '',
            duration: '',
            description: '',
            subjectID: 0,
        }
    })

    const handleChange = (file) => {
        setFile(file);
    };
    const onSubmit = (data) => {
        const formData = parseFormData(data);
        formData.append("thumbnail", file);
        setLoading(true);
        setError(null);
        api.post('course', formData).then((r) => console.log(r.data))
            .catch((e) => setError(parseMessage(e)))
            .finally(() => setLoading(false));
    }

    const init = () => {
        api.get('basicdata/subject',).then((r) => {
            setSubject(r.data.map((d) => {
                d.title = d.subject;
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
                    margin: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <FormContainer onSuccess={onSubmit} formContext={formContext}>
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
                                name="subjectID"
                                size="small"
                                fullWidth
                                required
                                options={subjects}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <label>Duration:</label>
                        </Grid>
                        <Grid item xs={4}>
                            <TextFieldElement name="duration" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={12}>Thumbnail</Grid>
                        <Grid item xs={12}>
                            <FileUploader handleChange={handleChange} types={["JPG", "PNG", "GIF"]} />
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
