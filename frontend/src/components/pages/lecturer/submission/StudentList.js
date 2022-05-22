import React from 'react';
import {
    IconButton,
    List,
    ListItemText,
    TextField,
    Typography,
    Container,
    Avatar,
    ListItemAvatar,
    ListItemButton, Paper, ListSubheader
} from '@mui/material';
import {ListItem} from '@mui/material';
import {stringToColor} from "../../../../helpers/functions";
import Moment from "react-moment";

const StudentList = (props) => {
    const data = props.data;

    const handleSearch = (e) => {
        // let value=e.target.value.toLowerCase();
        // let result=[];
        // result=allData.filter(data=>{
        //   return data.title.search(value) != -1;
        // });
        // setFilteredData(result);
    }

    const onClickHandler = (index) => {
        props.onSelect(index);
    }

    return (


        <List dense dense
              sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': {padding: 0},
              }}
              subheader={<ListSubheader>Students</ListSubheader>}>
            {data.map((e, index) => {
                const fullName = `${e.student.firstName} ${e.student.lastName}`;
                let sx = {};
                if (e.markedDate) {
                    sx = {background: '#E3FCBF', color: '#14C38E'};
                }
                if (index == props.selected) {
                    sx = {background: '#bbdefb', color: '#448aff'};
                }
                return (
                    <ListItem key={e.id}>
                        <ListItemButton onClick={() => onClickHandler(index)} sx={sx}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={fullName}
                                    sx={{bgcolor: stringToColor(fullName)}}/>
                            </ListItemAvatar>
                            <ListItemText primary={fullName}
                                          secondary={<Moment format="YYYY/MM/DD LT">{data.submittedDate}</Moment>}
                            />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>


    )

}

export default StudentList;