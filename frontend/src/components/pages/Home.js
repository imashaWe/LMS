import {useAuthUser} from "react-auth-kit";
import HomeLecturer from "./lecturer/HomeLecturer";
import HomeStudent from "./Student/home/HomeStudent";

function Home() {
    const auth = useAuthUser()
    const isStu = auth().roles.indexOf("ROLE_STUDENT") != -1;
    return isStu ? <HomeStudent/> : <HomeLecturer/>
}

export default Home;