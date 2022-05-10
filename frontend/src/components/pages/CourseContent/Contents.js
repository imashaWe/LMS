import React from 'react';
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

function Contents() {
    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
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
                                <TableCell>Added Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Lecture Slides</TableCell>
                                <TableCell>This is description.</TableCell>
                                <TableCell>Document</TableCell>
                                <TableCell>2022/05/06</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button>Edit</Button>
                                        <Button color="error">Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

            <Fab variant="extended" color="primary" aria-label="add" style={fabStyle} href="/courseContent/contents/create">
                <AddIcon sx={{mr: 1}}/>
                Add New
            </Fab>

        </Box>
    );
}

export default Contents;