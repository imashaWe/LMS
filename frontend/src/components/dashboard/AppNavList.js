import * as React from 'react';
import {useAuthUser} from "react-auth-kit";
import LecturerNavigation from "./navigations/LecturerNavigation";
import StudentNavigation from "./navigations/StudentNavigation";

const AppNavList = () => {
    const auth = useAuthUser();
    const isLecturer = auth().authorities.findIndex((a) => a.authority == "ROLE_LECTURER") != -1;
    return isLecturer ? <LecturerNavigation/> : <StudentNavigation/>
}

export default AppNavList;
