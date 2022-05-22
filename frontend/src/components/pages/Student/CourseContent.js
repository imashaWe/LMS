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
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CampaignIcon from '@mui/icons-material/Campaign';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StarIcon from '@mui/icons-material/Star';
import BookIcon from '@mui/icons-material/Book';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useApi} from "../../../helpers/hookes/useApi";
import {useAppLoading} from "../../../providers/AppLoading";
import {useAppMessage} from "../../../providers/AppMessage";


export default function CourseContent() {

    const [data, setData] = useState([]);
    const api = useApi();
    const navigator = useNavigate();
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

    const navigateTo = ( path,data) => {
        navigator(path, {state: {data: data}});
    }
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
                    <Box sx={{margin: 8, align: "center"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <BookIcon/>
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
                                            <StarIcon/>
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
                                            <DateRangeIcon/>
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
                                        <TimelineDot color="primary" variant="outlined">
                                            {(d.type == 'Content') && <VideoFileIcon/>}
                                            {(d.type == 'Assignment') && <AssignmentIcon/>}
                                            {(d.type == 'Announcement') && <CampaignIcon/>}
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
                                                    {(d.type == 'Content') &&
                                                    <Button size="small"
                                                            variant="contained"
                                                            onClick={()=>navigateTo('/mycourses/details',d)}> View
                                                    </Button>
                                                    }
                                                    {(d.type == 'Assignment') &&
                                                    <Button size="small"
                                                            variant="contained"
                                                            onClick={()=>navigateTo('/mycourses/submission',d)}> Submit
                                                    </Button>
                                                    }
                                                    {(d.type == 'Announcement') &&
                                                    <Button size="small"
                                                            variant="contained"
                                                            onClick={()=>navigateTo('/mycourses/details',d)}>View
                                                    </Button>
                                                    }
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