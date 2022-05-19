import {useLocation, useNavigate} from "react-router-dom";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {SnackbarProvider, useSnackbar} from "material-ui-snackbar-provider";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const AppErrorContext = createContext({
    appError: null, setAppError: () => {
    }
});

const DialogOpenContext = createContext({
    data: {open: false},
    setData: () => {
    }
})

export default function AppMessage({children}) {
    const location = useLocation();
    const [appError, setAppError] = useState();
    const [data, setData] = useState({open: false});

    const value = useMemo(() => ({appError, setAppError}), [appError]);
    const dialogValue = useMemo(() => ({data, setData}), [data]);

    useEffect(() => setAppError(null), [location]);

    const handleClose = () => {
        setData({open: false});
    };

    return (
        <AppErrorContext.Provider value={value}>
            <SnackbarProvider SnackbarProps={{autoHideDuration: 4000}}>
                <DialogOpenContext.Provider value={dialogValue}>
                    {children}
                    <Dialog
                        open={data.open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {data.title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {data.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{data.no}</Button>
                            <Button
                                onClick={
                                    () => {
                                        data.onClickYes();
                                        handleClose();
                                    }
                                }
                                variant="contained"
                                autoFocus color="error">
                                {data.yes}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </DialogOpenContext.Provider>

            </SnackbarProvider>
        </AppErrorContext.Provider>
    )
        ;
}

export const useAppMessage = () => {
    const snackbar = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const {appError, setAppError} = useContext(AppErrorContext)
    const {data, setData} = useContext(DialogOpenContext);

    const parseMessage = (e) => {
        if (typeof e == "string") {
            return e;
        }

        if (e.response) {

            if (e.response.status === 404) {
                navigate('/404');
            }
            if (e.response.status === 401) {
                navigate(`/login?redirect=${location.pathname}`);
            }
            if (e.response.status === 403) {
                navigate(`/403`);
            }

            return e.response.data;
        }

        return e.message;
    }

    return {
        error: appError,
        clear: () => {
            setAppError(null)
        },
        setError: (message) => {
            setAppError(parseMessage(message));
        },
        notifyError: (message) => {
            snackbar.showMessage(parseMessage(message));
        },
        notifySuccess: (message) => {
            snackbar.showMessage(message);
        },
        showDialog: (title, message, onClickYes, yes = "Yes", no = "Cancel") => {
            setData({
                open: true,
                title: title,
                message: message,
                onClickYes: onClickYes,
                yes: yes,
                no: no,
            })
        }

    }
}


