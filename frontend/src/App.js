import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";

function App() {
    const pageRoutes = useRoutes(routes);
    return pageRoutes;

}

export default App;
