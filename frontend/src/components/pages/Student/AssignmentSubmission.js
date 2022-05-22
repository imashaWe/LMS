import React, {useState} from 'react';
import {Button, Container, Typography, Checkbox, Box, Breadcrumbs, Link, Divider, Grid, Alert} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";
import DueTimeText from "../../common/DueTimeText";
import FileUploader from "../../common/FileUploader";
import {CheckboxButtonGroup, FormContainer} from "react-hook-form-mui";
import {parseFormData, parseMessage} from "../../../helpers/functions";
import {useApi} from "../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../providers/AppMessage";
import {LoadingButton} from "@mui/lab";


const AssignmentSubmission = () => {


    const api = useApi();
    const [loading, setLoading] = useState(false);
    const {state} = useLocation();
    const appMessage = useAppMessage();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    const onSubmit = (data) => {
        appMessage.clear()
        const formData = new FormData();
        if (file == null) {
            appMessage.setError("Please upload your assignment");
        }
        setLoading(true);
        formData.append("file", file);
        api.post(`submission/${state.data.id}`, formData).then((r) => {
            appMessage.notifySuccess("Saved Successfully");
            navigate(`/mycourses/${state.data.course.id}`);
        })
            .catch((e) => appMessage.setError(parseMessage(e)))
            .finally(() => setLoading(false))
    }
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
                <FormContainer onSuccess={onSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography varaint="h6" sx={{margin: '15px'}}>{state.data.description}</Typography>

                            <Button variant="outlined" size="small" sx={{margin: '10px'}}
                                    href={state.data.fileURL}>Download</Button>

                            <Typography variant="h6" sx={{margin: '15px'}}><DueTimeText
                                date={state.data.dueDate}/></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FileUploader onChange={handleChange} name="file"/>
                        </Grid>
                        <Grid item xs={12}>
                            <CheckboxButtonGroup
                                name="accept"
                                required
                                options={[
                                    {
                                        id: '1',
                                        label: 'This assignment is my own work except where I have acknowledged the use of the work of other people.'
                                    },

                                ]}
                            />
                            <Typography variant="h6" sx={{margin: '15px'}}>
                            </Typography>
                        </Grid>
                    </Grid>
                    {appMessage.error && (
                        <Alert severity="error" sx={{marginTop: 2}}>{appMessage.error}</Alert>
                    )}
                    <LoadingButton l
                                   loading={loading}
                                   type="submit"
                                   variant="contained"
                                   size="large"
                                   sx={{margin: '10px', float: 'right'}}>Save
                    </LoadingButton>
                </FormContainer>
            </Box>
        </Box>

    )
}

export default AssignmentSubmission;