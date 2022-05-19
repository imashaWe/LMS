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
import AddIcon from '@mui/icons-material/Add';
import {fabStyle} from "../../../../config/style";
import {useLocation, useNavigate} from "react-router-dom";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppLoading} from "../../../../providers/AppLoading";
import {useAppMessage} from "../../../../providers/AppMessage";

function Contents() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();
    const {state} = useLocation();
    const url = `/course/content/create/${state.data.id}`;

    const init = () => {
        setAppLoading(true)
        api.get(`content/${state.data.id}`)
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setAppLoading(false));
    }
    const editHandler = (data) => {
        delete data.course;
        delete data.file;
        navigate(url, {state: {data}})
    }

    const deleteContent = (id) => {
        appMessage.showDialog("Delete Content", "Are you sure you want to permanently delete this content?", () => {
            api.delete(`content/${id}`).then(() => {
                init();
                appMessage.notifySuccess("Deleted Successfully");
            }).catch((e) => {
                appMessage.notifyError(e);
            })
        });

    }
    useEffect(() => {
        init()
    }, []);

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/course">
                    Course
                </Link>
                <Typography color="text.primary">{state.data.title}</Typography>
                <Typography color="text.primary">Contents</Typography>
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
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((d) => {
                                    var date = new Date(d.dueDate);
                                    return (
                                        <TableRow key={d.id}>
                                            <TableCell>{d.name}</TableCell>
                                            <TableCell>{d.description}</TableCell>
                                            <TableCell>{d.type}</TableCell>
                                            <TableCell>{date.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained"
                                                             aria-label="outlined primary button group">
                                                    <Button onClick={() => editHandler(d)}>Edit</Button>
                                                    <Button color="error" onClick={() => {
                                                        deleteContent(d.id)
                                                    }}>Delete</Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle} href={url}>
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>
        </Box>
    );
}

export default Contents;