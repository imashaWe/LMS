import {Box, Fab, Grid} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useRef, useState} from "react";

export default function FileUploader(props) {

    const imageType = /image\^*/;
    const defaultText = "Choose a file";
    const fileInputRef = useRef();
    const [url, setUrl] = useState();
    const [fileName, setFileName] = useState(defaultText);

    const onChangeHandler = () => {
        if (!fileInputRef.current.files.length) return;
        const file = fileInputRef.current.files[0];

        if (imageType.test(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setFileName(defaultText);
                setUrl(reader.result);
            }
        } else {
            setFileName(file.name);
            setUrl(null);
        }
        props.onChange(file);
    }

    return (<Box
            textAlign="center"
            sx={{
                border: "solid 0.5px #E8E8E8",
                backgroundImage: `url(${url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: props.height ?? 250,
                width: "auto"
            }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: '100%'}}
            >
                <Grid item xs={3}>
                    <Fab onClick={() => {
                        fileInputRef.current.click();
                    }}>
                        <CloudUploadIcon/>
                    </Fab>
                    <h2>{fileName}</h2>
                    <input
                        type="file"
                        style={{display: "none"}}
                        ref={fileInputRef}
                        onChange={(e) => onChangeHandler()}/>
                </Grid>
            </Grid>

        </Box>);
}