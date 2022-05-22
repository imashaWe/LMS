import React, {useEffect, useState} from 'react';
import {
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Divider,
    Fab,
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
import {fabStyle} from "../../../config/style";
import {useApi} from "../../../helpers/hookes/useApi";
import {useNavigate} from "react-router-dom";
import {useAppLoading} from "../../../providers/AppLoading";
import {useAppMessage} from "../../../providers/AppMessage";

function Courses() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();

    const init = () => {
        setAppLoading(true)
        api.get('course/my')
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setAppLoading(false));
    }
    const navigateToContent = (data) => {
        navigate('content', {state: {data}});
    }
    const editHandler = (data) => {
        delete data.subjectID;
        delete data.levelID;
        delete data.lecturer;
        delete data.thumbnailURL;
        delete data.subject;
        delete data.level;
        navigate('create', {state: {data}})
    }
    const deleteHandler = (id) => {
        appMessage.showDialog("Delete Course","Are you sure you want to permanently delete this course?", () => {
                deleteCourse(id)
            }
        )
    }
    const deleteCourse = (id) => {
        api.delete(`course/${id}`).then((r) => {
            init();
            appMessage.notifySuccess("Deleted Successfully");
        }).catch((e) => {
            appMessage.notifyError(e);
        })
    }
    useEffect(() => {
        init()
    }, []);

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Courses</Typography>
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
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((d) => {
                                    return (
                                        <TableRow key={d.id} hover={true}>
                                            <TableCell onClick={() => navigateToContent(d)} >{d.title}</TableCell>
                                            <TableCell onClick={() => navigateToContent(d)} >{d.description}</TableCell>
                                            <TableCell onClick={() => navigateToContent(d)} >{d.duration}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained"
                                                             aria-label="outlined primary button group">
                                                    <Button onClick={() => editHandler(d)}>Edit</Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() => {
                                                            deleteHandler(d.id)
                                                        }}>Delete
                                                    </Button>
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

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle} href="/course/create">
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>

        </Box>
    );
}

export default Courses;