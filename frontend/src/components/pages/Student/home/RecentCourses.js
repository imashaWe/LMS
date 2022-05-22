import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../../providers/AppMessage";
import {useEffect, useState} from "react";
import {Box, Breadcrumbs, Divider, Grid, Typography} from "@mui/material";
import CourseViewCard from "../CourseViewCard";
import {useNavigate} from "react-router-dom";

function RecentCourses() {
    const api = useApi();
    const appMessage = useAppMessage();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const onClickHandler = (data) => {
        navigate(`/mycourses/${data.id}`)
    }

    const init = () => {
        api.get('course/my')
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
    }

    useEffect(() => {
        init();
    }, [0]);

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Recent Courses</Typography>
            </Breadcrumbs>

            <Divider/>

            <Box sx={{marginY: 2}}>
                <Grid container spacing={2} columns={{xs: 4, sm: 12, md: 12}}>
                    {data.map((d) => (
                        <Grid item key={d.id} xs={2} sm={3} md={3}>
                            <CourseViewCard data={d} onClick={() => onClickHandler(d)}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    )

}

export default RecentCourses;