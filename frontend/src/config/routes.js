import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/auth/Login"
import {RequireAuth} from "../providers/AuthProvider";

export const routes = [
    {
        path: "*",
        element: <Page404/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <RequireAuth><Home/></RequireAuth>,

    },
];