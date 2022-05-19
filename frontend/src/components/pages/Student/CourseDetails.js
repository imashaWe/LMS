import {
    Box,
    Breadcrumbs,
    Divider,
    Link,
    Typography,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Button,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText, Container
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import {useLocation, useNavigate} from "react-router-dom";
import {useApi} from "../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../providers/AppMessage";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";

function CourseDetails() {
    const {state} = useLocation();
    const [loading, setLoading] = useState(false);
    const data = state.data;
    const api = useApi();
    const appMessage = useAppMessage();
    const navigate = useNavigate();

    const onEnrollHandler = () => {
        setLoading(true);

        api.post(`course/enroll/${data.id}`)
            .then((r) => {
                appMessage.notifySuccess("Enrolled Successfully");
                navigate("/mycourses")
            })
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setLoading(false));

    }

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href="/allcourses"
                >
                    All Courses
                </Link>
                <Typography color="text.primary">{data.title}</Typography>
            </Breadcrumbs>

            <Divider/>

            <Box sx={{marginY: 2}}>
                <Grid container spacing={2} justifyContent="center">

                    <Grid item xs={10}>

                        <Box sx={{
                            width: "100%",
                            height: 250,
                            backgroundImage: `url(${data.thumbnailURL})`
                        }}>
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.description}
                        </Typography>

                        <Grid container spacing={3}>

                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Lecturer"
                                        secondary={`${data.lecturer.firstName} ${data.lecturer.lastName}`}/>
                                </ListItem>
                            </Grid>

                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccessTimeIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Duration" secondary={`${data.duration} weeks`}/>
                                </ListItem>
                            </Grid>

                            <Grid item xs={4}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <StarIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Level" secondary={data.level.level}/>
                                </ListItem>
                            </Grid>

                        </Grid>

                        <Grid container justifyContent="center" sx={{marginY: 2}}>
                            <Grid item xs={3}>
                                <LoadingButton
                                    variant="contained"
                                    fullWidth
                                    onClick={onEnrollHandler}
                                    loading={loading}>Enroll
                                </LoadingButton>
                            </Grid>
                        </Grid>


                    </Grid>


                </Grid>
            </Box>

        </Box>
    );
}

export default CourseDetails;