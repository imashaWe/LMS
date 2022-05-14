import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/pages/auth/Login"
import SignUp from "../components/pages/auth/SignUp";
import {RequireAuth} from 'react-auth-kit'
import Dashboard from "../components/dashboard/Dashboard";
import Blank from "../components/pages/Blank";
import Page401 from "../components/pages/Page401";

export const routes = [
    {
        path: "*",
        element: <Page404/>
    },
    {
        path: "404",
        element: <Page404/>
    },
    {
        path: "401",
        element: <Page401/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <SignUp/>

    },
    {
        path: "/",
        element: <RequireAuth loginPath={'/login'}><Dashboard><Home/></Dashboard></RequireAuth>,

    },
    {
        path: "/blank",
        element: <RequireAuth loginPath={'/login'}><Dashboard><Blank/></Dashboard></RequireAuth>,

    },
];