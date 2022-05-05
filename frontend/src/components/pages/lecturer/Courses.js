import React from 'react';
import {
    Box,
    Breadcrumbs, Button,
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

function Courses() {
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
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Software Engineering</TableCell>
                                <TableCell>
                                    This course covers the fundamentals of software engineering
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained">Edit</Button>
                                    <Button variant="contained" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
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