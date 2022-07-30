import database from '../../config/mysql.config.js';
import TRACKS_QUERY from '../query/tracks.query.js';
import {
    sendOkResponse,
    sendCreatedResponse,
    sendNotFoundResponse,
    sendServerErrorResponse
} from '../util/http.js';

export const getTracks = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACKS, (error, results) => {
        if (error) {
            return sendServerErrorResponse(res);
        }

        if (!results) {
            return sendOkResponse(res, 'No tracks found');
        }

        return sendOkResponse(res, 'Tracks retrieved', { tracks: results });
    });
};

export const createTrack = (req, res) => {
    database.query(TRACKS_QUERY.CREATE_TRACK, Object.values(req.body), (error, results) => {
        if (!results) {
            return sendServerErrorResponse(res);
        }

        const track = {
            id: results.insertId,
            ...req.body,
            created_at: new Date()
        };

        return sendCreatedResponse(res, 'Track created', { track });
    });
};

export const getTrack = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACK, [req.params.id], (error, results) => {
        if (error) {
            return sendServerErrorResponse(res);
        }

        if (!results[0]) {
            return sendNotFoundResponse(res, `Track id ${req.params.id} was not found`);
        }

        return sendOkResponse(res, 'Track retrieved', results[0]);
    });
};

export const updateTrack = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACK, [req.params.id], (error, results) => {
        if (!results[0]) {
            return sendNotFoundResponse(res, `Track id ${req.params.id} was not found`);
        }

        database.query(TRACKS_QUERY.UPDATE_TRACK, [...Object.values(req.body), req.params.id], (error, results) => {
            if (error) {
                return sendServerErrorResponse(res);
            }

            return sendOkResponse(res, 'Track updated', { id: req.params.id, ...req.body });
        });
    });
};

export const deleteTrack = (req, res) => {
    const ids = req.body.id;
    Promise.all(ids.map(async id => await deleteTrackItem(id))).then(() => {
        return sendOkResponse(res, 'Track deleted');
    }).catch(error => {
        return sendNotFoundResponse(res, error);
    });
};

const deleteTrackItem = (id) => {
    return new Promise((resolve, reject) => {
        database.query(TRACKS_QUERY.DELETE_TRACK, [id], (error, results) => {
            if (error) {
                reject(`Track id ${id} was not found`);
            } else {
                resolve(true);
            }
        });
    });
};

export const resetAlbumTracks = (req, res) => {
    const ids = req.body.ids;

    Promise.all(ids.map(async id => await resetAlbumTrack(id))).then(() => {
        return sendOkResponse(res, 'Tracks updated', { ids });
    }).catch(() => {
        return sendServerErrorResponse(res);
    });
}

const resetAlbumTrack = (id) => {
    return new Promise((resolve, reject) => {
        database.query(TRACKS_QUERY.RESET_ALBUM_TRACKS, [id], (error, results) => {
            if (error) {
                reject('Error occurred');
            } else {
                resolve(true)
            }
        });
    });
};
