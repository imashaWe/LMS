import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";

function App() {
    const pageRoutes = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            {pageRoutes}
        </ThemeProvider>
    );

}

export default App;
