import { API_BASE_PATH, ALBUMS_PATH } from "./config";

export const getAlbums = () => {
    return fetch(`${API_BASE_PATH}${ALBUMS_PATH}`).then(res => res.json()).then(res => {
        if (res.data?.albums) {
            return res.data.albums;
        }
    });
};

export const getAlbum = (id) => {
    return fetch(`${API_BASE_PATH}${ALBUMS_PATH}/${id}`).then(res => res.json()).then(res => {
        return res.data;
    });
};

export const createAlbum = (name) => {
    return fetch(`${API_BASE_PATH}${ALBUMS_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ album_name: name })
    }).then(res => res.json()).then(res => {
        return res;
    });
};

export const deleteAlbum = (id) => {
    return fetch(`${API_BASE_PATH}${ALBUMS_PATH}/${id}`, {
        method: 'DELETE'
    }).then(res => res.json()).then(res => {
        return res;
    })
};
