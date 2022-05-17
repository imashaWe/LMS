import Home from "../components/pages/Home";
import {RequireAuth} from 'react-auth-kit'
import Dashboard from "../components/dashboard/Dashboard";
import Blank from "../components/pages/Blank";
import Contents from "../components/pages/CourseContent/Contents";
import ContentCreate from "../components/pages/CourseContent/ContentCreate";
import Login from "../components/pages/auth/Login";
import SignUp from "../components/pages/auth/SignUp";
import Page404 from "../components/pages/error/Page404";

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
        element: <RequireAuth loginPath={'/login'}><Dashboard><Home/></Dashboard></RequireAuth>,

    },
    {
        path: "/blank",
        element: <RequireAuth loginPath={'/login'}><Dashboard><Blank/></Dashboard></RequireAuth>,

    },
    {
        path: "/content",
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><Contents/></Dashboard></RequireAuth>,

            },
            {
                path: "/content/create",
                element: <RequireAuth loginPath={'/login'}><Dashboard><ContentCreate/></Dashboard></RequireAuth>,

            },
        ],


    },
    {
        path: "/content/create",
        element: <RequireAuth loginPath={'/login'}><Dashboard><ContentCreate/></Dashboard></RequireAuth>,

    },
];