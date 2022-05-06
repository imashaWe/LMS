import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp";
import {RequireAuth} from 'react-auth-kit'
import Dashboard from "../components/dashboard/Dashboard";
import Blank from "../components/pages/Blank";
import Contents from "../components/pages/CourseContent/Contents";
import ContentCreate from "../components/pages/CourseContent/ContentCreate";

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
        path: "/courseContent/contents",
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><Contents/></Dashboard></RequireAuth>,

            },
            {
                path: "/courseContent/contents/create",
                element: <RequireAuth loginPath={'/login'}><Dashboard><ContentCreate/></Dashboard></RequireAuth>,

            },
        ],


    },
    {
        path: "/courseContent/contents/create",
        element: <RequireAuth loginPath={'/login'}><Dashboard><ContentCreate/></Dashboard></RequireAuth>,

    },
];