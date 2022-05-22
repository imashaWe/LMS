import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

function CourseViewCard(props) {
    return (
        <Card sx={{width: "100%"}} onClick={() => props.onClick()} elevation={5}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.data.thumbnailURL}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}

export default CourseViewCard;