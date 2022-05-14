import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import AppLoadingProvider from "./providers/AppLoading";
import {SnackbarProvider} from "material-ui-snackbar-provider";

function App() {
    const pageRoutes = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <AppLoadingProvider>
                <SnackbarProvider SnackbarProps={{autoHideDuration: 4000}}>
                    {pageRoutes}
                </SnackbarProvider>
            </AppLoadingProvider>
        </ThemeProvider>
    );

}

export default App;
