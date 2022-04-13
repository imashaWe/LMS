import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp";
import {RequireAuth} from 'react-auth-kit'

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
        element: <SignUp/>

    },
    {
        path: "/",
        element: <RequireAuth loginPath={'/login'}><Home/></RequireAuth>,

    },
];