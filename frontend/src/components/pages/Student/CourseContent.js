import React, {useEffect, useState} from 'react';
import {
    Timeline,
    TimelineConnector, TimelineContent,
    TimelineDot,
    TimelineItem, TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Link, ListItem, ListItemAvatar, ListItemText,
    Paper,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useAppLoading} from "../../providers/AppLoading";
import {useAppMessage} from "../../providers/AppMessage";
import {useApi} from "../../helpers/hookes/useApi";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import {useLocation, useParams} from "react-router-dom";
import DetailsIcon from '@mui/icons-material/Details';


export default function CourseContent() {

    const [data, setData] = useState([]);
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();
    const {courseID} = useParams();

    const init = () => {
        setAppLoading(true)
        api.get(`content/${courseID}`)
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
                <Link underline="hover" color="inherit" href="/mycourses">
                    My Courses
                </Link>
                {
                    data.length && (<Typography color="text.primary">{data[0].course.title}</Typography>)
                }

            </Breadcrumbs>

            <Divider/>

            <Box
                sx={{
                    margin: 8
                }}
            >
                {data.length && (
                    <Box sx={{margin: 8,align: "center"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DetailsIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Subject"
                                        secondary={`${data[0].course.subject.subject}`}/>
                                </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DetailsIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Level"
                                        secondary={`${data[0].course.level.level}`}/>
                                </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DetailsIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Duration"
                                        secondary={`${data[0].course.duration}`}/>
                                </ListItem>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">{data[0].course.description}</Typography>
                            </Grid>
                         </Grid>
                    </Box>
                )}
                <Grid container spacing={2}>
                    <Timeline position="right">
                        {data.map((d) => {
                            return (
                                <TimelineItem key={d.id}>
                                    <Grid item xs={2}>
                                        <TimelineOppositeContent
                                            sx={{m: 'auto 0'}}
                                            align="right"
                                            variant="body2"
                                            color="text.secondary"
                                        >{d.dueDate}
                                        </TimelineOppositeContent>
                                    </Grid>
                                    <TimelineSeparator>
                                        <TimelineConnector/>
                                        <TimelineDot color="primary">
                                            {(d.type == 'Content') && <LibraryBooksIcon/>}
                                            {(d.type == 'Assignment') && <AssignmentIcon/>}
                                            {(d.type == 'Announcement') && <AnnouncementIcon/>}
                                        </TimelineDot>
                                        <TimelineConnector/>
                                    </TimelineSeparator>
                                    <Grid item xs={10}>
                                        <Card variant="outlined" sx={{margin: 1, boxShadow: 1}}>
                                            <TimelineContent sx={{py: '12px', px: 2}}>
                                                <CardContent>
                                                    <Typography variant="h6" component="span">
                                                        {d.name}
                                                    </Typography>
                                                    <Typography>{d.description}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    {(d.type == 'Content') && <Button size="small" variant="outlined" > View</Button>}
                                                    {(d.type == 'Assignment') && <Button size="small" variant="outlined"> Submit</Button>}
                                                    {(d.type == 'Announcement') && <Button size="small" variant="outlined"> View</Button>}
                                                </CardActions>
                                            </TimelineContent>
                                        </Card>
                                    </Grid>
                                </TimelineItem>
                            )
                        })}
                    </Timeline>
                </Grid>
            </Box>
        </Box>
    );
}