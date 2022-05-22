import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useApi} from "../../../helpers/hookes/useApi";
import {useAppLoading} from "../../../providers/AppLoading";
import {useAppMessage} from "../../../providers/AppMessage";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {useAuthUser} from "react-auth-kit";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


function HomeLecturer() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api = useApi();
    const setAppLoading = useAppLoading();
    const appMessage = useAppMessage();
    const auth = useAuthUser()

    const init = () => {
        setAppLoading(true)
        api.get('course/my')
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => setAppLoading(false));
    }

    useEffect(() => {
        init()
    }, []);

    return (
        <Box>
            <h1> Welcome!</h1>
            <h3>{`${auth().firstName} ${auth().lastName}`}</h3>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                    <p>When you develop a mockup page or backend API is not ready for data fetching and you have to make
                        Frontend Development with static data until it comes, react-lorem-ipsum will create your
                        gibberish texts for you.</p>
                    <Box>
                        <img style={{width: "60%"}} src="/assets/images/student-home.svg"/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>My Courses</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        {data.map((e) => {
                            return (
                                <Card sx={{display: 'flex',marginY:1}}>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 151}}
                                        image={e.thumbnailURL}
                                        alt=""
                                    />
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography component="div" variant="h5">
                                            {e.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            <Chip icon={<FontAwesomeIcon icon={faUsers}/>}
                                                  label={e.studentList.length}/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );

                        })}
                    </Box>

                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeLecturer;