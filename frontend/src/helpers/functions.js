import {BASE_URL} from "../config/constants";

export const parseMessage = (e) => {
    if (!e.response) {
        return e.message;
    }

    return e.response.data.message;
}
export const parseApiUrl = (path) => BASE_URL + path;

export const parseFormData = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }
    return formData;
}

export const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}