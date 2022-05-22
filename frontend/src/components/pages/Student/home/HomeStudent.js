import {
    Box,
    Grid, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useApi} from "../../../../helpers/hookes/useApi";
import {useAppMessage} from "../../../../providers/AppMessage";
import {useAppLoading} from "../../../../providers/AppLoading";
import SubmissionView from "./SubmissionView";
import TodolistView from "./TodolistView";
import RecentCourses from "./RecentCourses";
import {useAuthUser} from "react-auth-kit";

function HomeStudent() {
   const auth = useAuthUser();
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='h3'>
                        Welcome!<br/>{`${auth().firstName} ${auth().lastName}`}
                    </Typography>
                    <Typography color='grey'>
                        A learning management system is a software application for the administration, documentation, tracking, reporting, automation, and delivery of educational courses, training programs, or learning and development programs.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <img src='/assets/images/student-home.svg' height={300} width={800}/>
                </Grid>
                <Grid item xs={12}>
                    <RecentCourses/>
                </Grid>
                <Grid item xs={6}>
                    <TodolistView/>
                </Grid>
                <Grid item xs={6}>
                    <SubmissionView/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeStudent;