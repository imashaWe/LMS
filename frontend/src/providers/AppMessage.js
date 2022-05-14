import {useLocation, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {SnackbarProvider, useSnackbar} from "material-ui-snackbar-provider";

const AppErrorContext = createContext({
    appError: null,
    setAppError: () => {
    }
});

export default function AppMessage({children}) {
    const location = useLocation();
    const [appError, setAppError] = useState();

    const value = useMemo(
        () => ({appError, setAppError}),
        [appError]
    );

    useEffect(() => setAppError(null), [location]);

    return (
        <AppErrorContext.Provider value={value}>
            <SnackbarProvider SnackbarProps={{autoHideDuration: 4000}}>
                {children}
            </SnackbarProvider>
        </AppErrorContext.Provider>
    );
}

export const useAppMessage = () => {
    const snackbar = useSnackbar();
    const navigate = useNavigate();
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
                navigate('401');
            }

            return e.message;
        }

        return e.response.data.message;
    }

    return {
        error: appError,
        clear: () => {
            setAppError(null)
        },
        setError: (message) => {
            setAppError(message);
        },
        notifyError: (message) => {
            snackbar.showMessage(parseMessage(message));
        },
        notifySuccess: (message) => {
            snackbar.showMessage(message);
        }
    }
}

