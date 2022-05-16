import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import AppLoadingProvider from "./providers/AppLoading";
import AppMessage from "./providers/AppMessage";

function App() {
    const pageRoutes = useRoutes(routes);
    return (<ThemeProvider theme={theme}>
            <AppLoadingProvider>
                <AppMessage>
                    {pageRoutes}
                </AppMessage>
            </AppLoadingProvider>
        </ThemeProvider>);

}

export default App;
