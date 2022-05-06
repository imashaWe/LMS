import { React, useState } from "react";
import { Box, Breadcrumbs, Divider, Link, Typography, CardContent, CardMedia, Grid, Paper, Button, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import "./App.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function CourseDetails() {
    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                >
                    All Courses
                </Link>
                <Typography color="text.primary">Course Details</Typography>
            </Breadcrumbs>
            <Divider />

            <div className="grid">
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: '100%',
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Lecture Name" secondary="test@gmail.com" />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccessTimeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Duration" secondary="10 weeks" />
                            </ListItem>
                        </Grid>
                        <Grid item xs= {4}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <StarIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Level" secondary="Intermediate level" />
                            </ListItem>
                        </Grid>
                    </Grid>
                    <div className="button">
                        <Button variant="contained" >Enroll</Button>
                    </div>
                </Paper>

            </div>

        </Box>
    );
}

export default CourseDetails;