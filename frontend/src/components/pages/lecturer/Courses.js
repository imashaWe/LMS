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

function Courses() {
    const [data, setData] = useState([]);
    const api = useApi();

    const init = () => {
        api.get('course').then((r) => setData(r.data));
    }

    //update

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
                                        <TableRow>
                                            <TableCell>{d.title}</TableCell>
                                            <TableCell>
                                                {d.description}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained"
                                                             aria-label="outlined primary button group">
                                                    <Button>Edit</Button>
                                                    <Button color="error">Delete</Button>
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