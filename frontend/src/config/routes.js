import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp";
import {RequireAuth} from 'react-auth-kit'
import Dashboard from "../components/dashboard/Dashboard";
import Blank from "../components/pages/Blank";
import Courses from "../components/pages/lecturer/Courses";
import CourseCreate from "../components/pages/lecturer/CourseCreate";

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
        path: "/lecturer/courses",
        element: <RequireAuth loginPath={'/login'}><Dashboard><Courses/></Dashboard></RequireAuth>,

    },
    {
        path: "/lecturer/courses/create",
        element: <RequireAuth loginPath={'/login'}><Dashboard><CourseCreate/></Dashboard></RequireAuth>,

    },
    {
        path: "/blank",
        element: <RequireAuth loginPath={'/login'}><Dashboard><Blank/></Dashboard></RequireAuth>,

    },
];