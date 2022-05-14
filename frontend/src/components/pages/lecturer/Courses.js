import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Breadcrumbs, Button, ButtonGroup,
    Divider,
    Fab,
    Link, Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {fabStyle} from "../../../config/style";
import {useApi} from "../../../helpers/hookes/useApi";
import {useNavigate} from "react-router-dom";

function Courses() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api = useApi();

    const init = () => {
        api.get('course').then((r) => setData(r.data));
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
        api.delete(`course/${id}`).then((r) => {
            init()
        }).catch((e) => {
            console.log(e)
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
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((d) => {
                                    return (
                                        <TableRow key={d.id}>
                                            <TableCell>{d.title}</TableCell>
                                            <TableCell>
                                                {d.description}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained"
                                                             aria-label="outlined primary button group">
                                                    <Button onClick={() => editHandler(d)}>Edit</Button>
                                                    <Button color="error"
                                                            onClick={() => deleteHandler(d.id)}>Delete</Button>
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

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle} href="/lecturer/courses/create">
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>

        </Box>
    );
}

export default Courses;