import React, {useEffect, useState} from 'react';
import {useApi} from "../../../../helpers/hookes/useApi";
import {Box, Breadcrumbs, Container, Divider, Grid, Link, Typography} from '@mui/material';
import AssignmentViewer from './AssignmentViewer';
import StudentList from './StudentList';
import {useParams} from "react-router-dom";
import {useAppLoading} from "../../../../providers/AppLoading";
import {useAppMessage} from "../../../../providers/AppMessage";

function AssignmentMark() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(0)
    const {contentID} = useParams()
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();

    useEffect(() => {
        setAppLoading(true);
        api.get(`submission/${contentID}`)
            .then((res) => setData(res.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setAppLoading(false));
    }, []);

    if (!data.length) return <Box/>

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href="/submissions"
                >
                    All Courses
                </Link>
                <Typography color="text.primary">{data.name}</Typography>
            </Breadcrumbs>

            <Divider/>
            <Box sx={{margin:5}}>
                <Grid container>
                    <Grid item xs={4}>
                        <StudentList data={data} selected={selected} onSelect={setSelected}/>
                    </Grid>
                    <Grid item xs={8}>
                        <AssignmentViewer data={data} selected={selected} onChange={setSelected}/>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

export default AssignmentMark;
