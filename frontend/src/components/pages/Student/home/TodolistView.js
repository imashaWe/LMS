import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent, Chip, CircularProgress, ListItem, ListItemAvatar, ListItemText, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../../providers/AppMessage";
import DueTimeText from "../../../common/DueTimeText";
import Moment from "react-moment";
import {faFolder, faTasks} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function TodolistView() {
    const api = useApi()
    const appMessage = useAppMessage();
    const [loading, setLoading] = useState();

    const [submissionData, setSubmissionData] = useState([]);

    const init = () => {
        setLoading(true);
        api.get('submission/todolist')
            .then((r) => {
                setSubmissionData(r.data);
            }).catch((e) => appMessage.notifyError(e)).finally(() => setLoading(false));
    }

    useEffect(() => {
        init()
    }, []);


    return (
        <Card elevation={5}>
            <CardContent>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faTasks}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Todolist"/>
                </ListItem>
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ height: 440 }} component={Box}>
                        {
                            loading && (
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <CircularProgress/>
                                </Box>
                            )
                        }
                        {
                            !loading &&

                            <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Assignment</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {submissionData.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.course.title}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                <Moment parse="YYYY-MM-DD HH:mm">
                                                    {row.dueDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell>
                                                <DueTimeText date={row.dueDate}/>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
                    </TableContainer>
                </Box>
            </CardContent>
        </Card>
    );

}

export default TodolistView;