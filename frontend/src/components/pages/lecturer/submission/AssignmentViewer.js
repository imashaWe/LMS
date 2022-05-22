import React, {useState} from 'react'
import {Alert, Typography} from '@mui/material'
import {FormContainer, SelectElement, TextFieldElement} from "react-hook-form-mui";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../../providers/AppMessage";
import {parseMessage} from "../../../../helpers/functions";
import DueTimeText from "../../../common/DueTimeText";
import RViewerJS from "viewerjs-react";
import 'viewerjs-react/dist/index.css';
import Moment from "react-moment";

function AssignmentViewer(props) {
    const data = props.data[props.selected];
    const api = useApi();
    const [loading, setLoading] = useState(false);
    const appMessage = useAppMessage();

    const onSubmit = (formData) => {
        setLoading(true);
        api.post(`submission/mark/${data.id}`, formData).then((r) => {
            appMessage.notifySuccess("Saved Successfully");

            if (data.length - 1 != props.selected) {
                const i = props.selected + 1;
                props.onChange(i);
            }

        })
            .catch((e) => appMessage.setError(parseMessage(e)))
            .finally(() => setLoading(false));
    }
    return (
        <FormContainer onSuccess={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>
                        <b >Submitted Date|</b>
                        <Moment format="YYYY/MM/DD LT">
                            {data.submittedDate}
                        </Moment>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        <b >Due Date|</b>
                        <Moment format="YYYY/MM/DD LT">
                            {data.content.dueDate}
                        </Moment>
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                    <b>Status</b>
                    <DueTimeText date={data.content.dueDate}/>
                </Grid>
                <Grid item xs={12}>
                    <RViewerJS>
                        <img
                            src={data.fileURL}/>
                    </RViewerJS>
                </Grid>
                <Grid item xs={3}>
                    <label>Marks:</label>
                </Grid>
                <Grid item xs={9}>
                    <TextFieldElement type="number" name="marks" fullWidth size='small' required/>
                </Grid>

                <Grid item xs={3}>
                    <label>Comment:</label>
                </Grid>
                <Grid item xs={9}>
                    <TextFieldElement name="comment" fullWidth multiline rows={5}/>
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
    )
}

export default AssignmentViewer;