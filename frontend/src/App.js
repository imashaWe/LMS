import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import AppLoadingProvider from "./providers/AppLoading";

function App() {
    const pageRoutes = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <AppLoadingProvider>
                {pageRoutes}
            </AppLoadingProvider>
        </ThemeProvider>
    );

}

export default App;
