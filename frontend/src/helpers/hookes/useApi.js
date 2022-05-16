import axios from "axios";
import {BASE_URL} from "../../config/constants";
import {useAuthHeader} from "react-auth-kit";

export const useApi = () => {
    const authHeader = useAuthHeader()
    return axios.create({
        baseURL: BASE_URL, headers: {
            'Content-Type': 'application/json', 'Authorization': authHeader(),
        }
    });
}