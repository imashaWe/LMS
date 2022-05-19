import Home from "../components/pages/Home";
import Page404 from "../components/pages/error/Page404";
import {RequireAuth} from 'react-auth-kit'
import Dashboard from "../components/dashboard/Dashboard";
import Blank from "../components/pages/Blank";
import SignUp from "../components/pages/auth/SignUp";
import Login from "../components/pages/auth/Login";
import Courses from "../components/pages/lecturer/Courses";
import CourseCreate from "../components/pages/lecturer/CourseCreate";
import Page403 from "../components/pages/error/Page403";
import Page401 from "../components/pages/error/Page401";
import AllCourses from "../components/pages/Student/AllCourses";
import CourseDetails from "../components/pages/Student/CourseDetails";
import MyCourses from "../components/pages/Student/MyCourses";

export const routes = [
    {
        path: "*", element: <Page404/>

    },
    {
        path: "/404", element: <Page404/>
    },
    {
        path: "/401", element: <Page401/>
    },
    {
        path: "/403", element: <Page403/>
    },
    {
        path: "/login", element: <Login/>
    },
    {
        path: "/signup", element: <SignUp/>

    },
    {
        path: "/", element: <RequireAuth loginPath={'/login'}><Dashboard><Home/></Dashboard></RequireAuth>,

    },
    {
        path: "/course",
        children: [
            {
                index: true, element: <RequireAuth loginPath={'/login'}><Dashboard><Courses/></Dashboard></RequireAuth>,
            },
            {
                path: "/course/create",
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseCreate/></Dashboard></RequireAuth>,
            }
        ]

    },
    {
        path: "/allcourses",
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><AllCourses/></Dashboard></RequireAuth>
            },
            {
                path: '/allcourses/view',
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseDetails/></Dashboard></RequireAuth>
            }
        ]

    },
    {
        path: "/mycourses",
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><MyCourses/></Dashboard></RequireAuth>
            },
        ]

    },
    {
        path: "/blank", element: <RequireAuth loginPath={'/login'}><Dashboard><Blank/></Dashboard></RequireAuth>,

    },
];