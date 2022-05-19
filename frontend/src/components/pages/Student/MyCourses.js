import {
    Grid,
    Box,
    Breadcrumbs,
    Divider,
    Typography
} from "@mui/material";
import CourseViewCard from "./CourseViewCard";
import SearchBar from "material-ui-search-bar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useApi} from "../../../helpers/hookes/useApi";
import {useAppLoading} from "../../../providers/AppLoading";
import {useAppMessage} from "../../../providers/AppMessage";

function MyCourses() {
    const [data, setData] = useState([]);
    const api = useApi();
    const appLoading = useAppLoading();
    const appMessage = useAppMessage();
    const navigate = useNavigate();

    const onClickHandler = (data) => {
        navigate(`/mycourses/${data.id}`)
    }

    const init = () => {
        appLoading(true);
        api.get('course/my')
            .then((r) => setData(r.data))
            .catch((e) => appMessage.notifyError(e))
            .finally(() => appLoading(false))
    }

    useEffect(() => {
        init();
    }, [0]);

    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">My Courses</Typography>
            </Breadcrumbs>

            <Divider/>

            <Box sx={{marginY: 2}}>
                <Grid container justifyContent="center">
                    <Grid item xs={6}>
                        <SearchBar/>
                    </Grid>
                </Grid>
            </Box>

            <Box>
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

export default MyCourses;