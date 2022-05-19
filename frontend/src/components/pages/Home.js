import {useAuthUser} from "react-auth-kit";
import HomeStudent from "./Student/HomeStudent";
import HomeLecturer from "./lecturer/HomeLecturer";

function Home() {
    const auth = useAuthUser()
    const isStu = auth().roles.indexOf("ROLE_STUDENT") != -1;
    return isStu ? <HomeStudent/> : <HomeLecturer/>
}

export default Home;