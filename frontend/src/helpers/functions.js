import {BASE_URL} from "../config/constants";

export const parseMessage = (e) => {
    if (!e.response) {
        return e.message;
    }

    return e.response.data.message;
}
export const parseApiUrl = (path) => BASE_URL + path;