import React, {useEffect, useState} from 'react';
import {
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Divider,
    Fab,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppLoading} from "../../../../providers/AppLoading";
import {useAppMessage} from "../../../../providers/AppMessage";
import Moment from "react-moment";

function Submission() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();

    const init = () => {
        setAppLoading(true)
        api.get(`content/my`)
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setAppLoading(false));
    }

    useEffect(() => {
        init()
    }, []);

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Submissions</Typography>
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
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 400}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Course</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Added Date</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((d) => {
                                    return (
                                        <TableRow key={d.id} hover={true} >
                                            <TableCell>{d.course.title}</TableCell>
                                            <TableCell>{d.name}</TableCell>
                                            <TableCell>
                                                <Moment format="YYYY/MM/DD LT">{data.addedDate}</Moment>
                                            </TableCell>
                                            <TableCell>
                                                <Moment format="YYYY/MM/DD LT">{data.dueDate}</Moment>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" href={`/submissions/${d.id}`}>View</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


        </Box>
    );
}

export default Submission;