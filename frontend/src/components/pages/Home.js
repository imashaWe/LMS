import {useApi} from "../../helpers/hookes/useApi";

function Home() {
    const api = useApi()
    const onClick = () => {
        api.get('test').then((r) => console.log(r)).catch((e) => console.log(e))
    }
    return <h1>Hello Wold</h1>
}

export default Home;