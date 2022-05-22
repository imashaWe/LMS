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
import DashboardIcon from '@mui/icons-material/Dashboard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder, faFolderTree, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import Contents from "../components/pages/lecturer/content/Contents";
import ContentCreate from "../components/pages/lecturer/content/ContentCreate";
import CourseContent from "../components/pages/Student/CourseContent";
import AssignmentSubmission from "../components/pages/Student/AssignmentSubmission";
import AssignmentMark from "../components/pages/lecturer/submission/AssignmentMark";
import Submission from "../components/pages/lecturer/submission/Submission";
import SingleContentView from "../components/pages/Student/SingleContentView";

export const routes = [
    {
        path: "*",
        element: <Page404/>

    },
    {
        path: "/404",
        element: <Page404/>
    },
    {
        path: "/401",
        element: <Page401/>
    },
    {
        path: "/403",
        element: <Page403/>
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
        dashboard:
            {
                title: 'Home',
                icon: <DashboardIcon/>,
                roles: ["ROLE_LECTURER", "ROLE_STUDENT"]
            },
        element: <RequireAuth loginPath={'/login'}><Dashboard><Home/></Dashboard></RequireAuth>,

    },
    {
        path: "/course",
        dashboard:
            {
                title: 'My Courses',
                icon: <FontAwesomeIcon icon={faFolder}/>,
                roles: ["ROLE_LECTURER"]
            },
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><Courses/></Dashboard></RequireAuth>,
            },
            {
                path: "/course/create",
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseCreate/></Dashboard></RequireAuth>,
            },
            {
                path: "/course/content",

                element: <RequireAuth loginPath={'/login'}><Dashboard><Contents/></Dashboard></RequireAuth>,
            },
            {
                path: "/course/content/create/:courseID",
                element: <RequireAuth
                    loginPath={'/login'}><Dashboard><ContentCreate/></Dashboard></RequireAuth>,
            },
        ]

    },
    {
        path: "/allcourses",
        dashboard:
            {
                title: 'All Courses',
                icon: <FontAwesomeIcon icon={faFolderTree}/>,
                roles: ["ROLE_STUDENT"]
            },
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><AllCourses/></Dashboard></RequireAuth>
            },{
                path: "/allcourses/view",
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseDetails/></Dashboard></RequireAuth>
            },

        ]

    },
    {
        path: "/mycourses",
        dashboard:
            {
                title: 'My Courses',
                icon: <FontAwesomeIcon icon={faFolder}/>,
                roles: ["ROLE_STUDENT"]
            },
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><MyCourses/></Dashboard></RequireAuth>
            },
            {
                path: "/mycourses/:courseID",
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseContent/></Dashboard></RequireAuth>,

            },    
            {
                path: '/mycourses/view',
                element: <RequireAuth loginPath={'/login'}><Dashboard><CourseDetails/></Dashboard></RequireAuth>
            },
            {
                path: "/mycourses/submission",
                element: <RequireAuth loginPath={'/login'}><Dashboard><AssignmentSubmission/></Dashboard></RequireAuth>,

            },
            {
                path: "/mycourses/details",
                element: <RequireAuth loginPath={'/login'}><Dashboard><SingleContentView/></Dashboard></RequireAuth>,

            }
        ]

    },
    {
        path: "/submissions",
        dashboard:
            {
                title: 'Submissions',
                icon: <FontAwesomeIcon icon={faPaperPlane}/>,
                roles: ["ROLE_LECTURER"]
            },
        children: [
            {
                index: true,
                element: <RequireAuth loginPath={'/login'}><Dashboard><Submission/></Dashboard></RequireAuth>
            },
            {
                path: '/submissions/:contentID',
                element: <RequireAuth loginPath={'/login'}><Dashboard><AssignmentMark/></Dashboard></RequireAuth>
            }
        ]
    },
];