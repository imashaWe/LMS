import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/auth/Login"
import {RequireAuth} from "../providers/AuthProvider";
import SignUp from "../components/auth/SignUp";

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
        path: "/signup",
        element:<SignUp/>

    },
    {
        path: "/",
        element: <RequireAuth><Home/></RequireAuth>,

    },
];