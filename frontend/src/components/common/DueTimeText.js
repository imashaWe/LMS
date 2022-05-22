import moment from "moment";
import {Chip} from "@mui/material";

function DueTimeText(props) {
    const diffMs = moment().diff(moment(props.date));
    const def = moment.duration(diffMs).humanize();

    return diffMs > 0 ?
        <Chip label={`${def} Overdue`} color='error'/> : <Chip label={`${def}  Remaining`}/>


}

export default DueTimeText;