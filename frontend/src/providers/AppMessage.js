import {useLocation, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {SnackbarProvider, useSnackbar} from "material-ui-snackbar-provider";
import {positions, Provider, useAlert} from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
    position: positions.MIDDLE
};

const AppErrorContext = createContext({
    appError: null, setAppError: () => {
    }
});

export default function AppMessage({children}) {
    const location = useLocation();
    const [appError, setAppError] = useState();

    const value = useMemo(() => ({appError, setAppError}), [appError]);

    useEffect(() => setAppError(null), [location]);

    return (<AppErrorContext.Provider value={value}>
            <SnackbarProvider SnackbarProps={{autoHideDuration: 4000}}>
                <Provider template={AlertMUITemplate} {...options}>
                    {children}
                </Provider>
            </SnackbarProvider>
        </AppErrorContext.Provider>);
}

export const useAppMessage = () => {
    const snackbar = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const alert = useAlert()
    const {appError, setAppError} = useContext(AppErrorContext)

    const parseMessage = (e) => {
        if (typeof e == "string") {
            return e;
        }

        if (e.response) {

            if (e.response.status == 404) {
                navigate('404');
            }
            if (e.response.status == 401) {
                navigate(`/login?redirect=${location.pathname}`);
            }
            if (e.response.status == 403) {
                navigate(`403`);
            }

            return e.message;
        }

        return e.response.data;
    }

    return {
        error: appError, alert: alert, clear: () => {
            setAppError(null)
        }, setError: (message) => {
            setAppError(message);
        }, notifyError: (message) => {
            snackbar.showMessage(parseMessage(message));
        }, notifySuccess: (message) => {
            snackbar.showMessage(message);
        }
    }
}

