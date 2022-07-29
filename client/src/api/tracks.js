import { API_BASE_PATH, TRACKS_PATH } from './config';

export const getTracks = () => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}`).then(res => res.json()).then(res => {
        if (res.data.tracks) {
            return res.data.tracks;
        }

        return [];
    })
};

export const getTrack = (id) => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}/${id}`).then(res => res.json()).then(res => {
        return res.data;
    });
};

export const updateTrack = (name, artist, genre, albumId, trackId) => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}/${trackId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ album_name: name, artist, genre, album_id: albumId })
    }).then(res => res.json()).then(res => {
        return res;
    });
};

export const createTrack = (name, artist, genre, albumId) => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track_name: name, artist, genre, album_id: albumId })
    }).then(res => res.json()).then(res => {
        return res;
    });
};

export const deleteTrack = (id) => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    }).then(res => res.json()).then(res => {
        return res;
    });
};

// Unassign music tracks from album 
// @param - ids - array of numbers
export const deleteTracksFromAlbum = (ids) => {
    return fetch(`${API_BASE_PATH}${TRACKS_PATH}/resetAlbumTracks`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
    }).then(res => res.json()).then(res => {
        return res;
    });
}