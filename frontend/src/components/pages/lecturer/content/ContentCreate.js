import React, {useState} from "react";
import {Alert, Box, Breadcrumbs, Divider, Link, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {FormContainer, RadioButtonGroup, TextFieldElement} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppMessage} from "../../../../providers/AppMessage";
import {parseFormData, parseMessage} from "../../../../helpers/functions";
import FileUploader from "../../../common/FileUploader";

function ContentCreate() {
    const api = useApi();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const {state} = useLocation();
    const {courseID} = useParams();
    const appMessage = useAppMessage();

    let defaultValues;
    if (state) {
        defaultValues = state.data;
    }

    const handleChange = (file) => {
        setFile(file);
    };

    const onSubmit = (data) => {
        appMessage.clear()
        const formData = parseFormData(data);
        if (file != null) {
            formData.append("file", file);
        }
        setLoading(true);
        api.post(`content/create/${courseID}`, formData).then((r) => {
            appMessage.notifySuccess("Saved Successfully");
            navigate(`/course`)
        })
            .catch((e) => appMessage.setError(parseMessage(e)))
            .finally(() => setLoading(false))
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/course/content">
                    Contents
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
                            <label>Name:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="name" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Description:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="description" fullWidth multiline rows={5} required/>
                        </Grid>

                        <Grid item xs={3}>
                            <label>Type: </label>
                        </Grid>
                        <Grid item xs={9}>
                            <RadioButtonGroup
                                name="type"
                                options={[
                                    {
                                        id: 'Content',
                                        label: 'Content'
                                    },
                                    {
                                        id: 'Assignment',
                                        label: 'Assignment'
                                    },
                                    {
                                        id: 'Announcement',
                                        label: 'Announcement'
                                    }
                                ]}
                                row
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <label>Due Date/Time:</label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextFieldElement name="dueDate" type="datetime-local" fullWidth size='small' required/>
                        </Grid>
                        <Grid item xs={3}>File:</Grid>
                        <Grid item xs={9}>
                            <FileUploader onChange={handleChange}/>
                        </Grid>

                    </Grid>

                    {appMessage.error && (
                        <Alert severity="error" sx={{marginTop: 2}}>{appMessage.error}</Alert>
                    )}
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

export default ContentCreate;