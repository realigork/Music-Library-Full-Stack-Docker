import { API_BASE_PATH, API_PATH } from "./config";

export const getApi = () => {
    return fetch(`${API_BASE_PATH}${API_PATH}`).then(res => res.json()).then(res => {
        return res.data?.api;
    });
};
