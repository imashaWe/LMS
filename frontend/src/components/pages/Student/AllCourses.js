import { React, useState } from "react";
import { TextField, Grid, Box, Breadcrumbs, Divider, Typography, Button, CardActionArea, CardActions,Card,CardMedia,CardContent,icons } from "@mui/material";
import "./App.css";


function AllCourses() {
    return (
        <Box>

            <Breadcrumbs aria-label="breadcrumb">

                <Typography color="text.primary">AllCourses</Typography>
            </Breadcrumbs>

            <Divider />


            <div className="main">
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search Course"
                    />
                </div>
            </div>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <h1><Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
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
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="success">
                                    Visit
                                </Button>
                            </CardActions>
                        </Card></h1>
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}

export default AllCourses;