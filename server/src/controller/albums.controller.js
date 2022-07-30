import database from '../../config/mysql.config.js';
import ALBUMS_QUERY from '../query/albums.query.js';
import {
    sendOkResponse,
    sendCreatedResponse,
    sendNotFoundResponse,
    sendServerErrorResponse
} from '../util/http.js';

export const getAlbums = (req, res) => {
    database.query(ALBUMS_QUERY.SELECT_ALBUMS, (error, results) => {
        if (error) {
            return sendServerErrorResponse(res);
        }

        if (!results) {
            return sendOkResponse(res, 'No albums found')
        }

        const albums = results.map(album => {
            return {
                ...album,
                path: `/albums/${album.album_id}`
            }
        })

        return sendOkResponse(res, 'Albums retrieved', { albums });
    });
};

export const createAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.CREATE_ALBUM, Object.values(req.body), (error, results) => {
        if (!results) {
            return sendServerErrorResponse(res);
        }

        const album = {
            id: results.insertedId,
            ...req.body,
            created_at: new Date()
        };

        return sendCreatedResponse(res, 'Album created', { album });
    });
};

export const getAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.SELECT_ALBUM, [req.params.id], (error, results) => {
        if (error) {
            return sendServerErrorResponse(res);
        }

        if (!results[0]) {
            return sendNotFoundResponse(res, `Album id ${req.params.id} was not found`);
        }

        const tracks = results.map(track => {
            if (!track.track_id) {
                return undefined;
            }

            return {
                track_id: track.track_id,
                track_name: track.track_name,
                artist: track.artist,
                genre: track.genre
            }
        }).filter(track => track !== undefined);

        const data = {
            album_id: results[0].album_id,
            album_name: results[0].album_name,
            tracks
        }

        return sendOkResponse(res, 'Album retrieved', data);
    });
};

export const updateAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.SELECT_ALBUM, [req.params.id], (error, results) => {
        if (!results[0]) {
            return sendNotFoundResponse(res, `Album id ${req.params.id} was not found`);
        }

        database.query(ALBUMS_QUERY.UPDATE_ALBUM, [...Object.values(req.body), req.params.id], (error, results) => {
            if (error) {
                return sendServerErrorResponse(res);
            }

            return sendOkResponse(res, 'Album updated', { id: req.params.id, ...req.body });
        });
    });
};

export const deleteAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.DELETE_ALBUM, [req.params.id], (error, results) => {
        if (error) {
            return sendServerErrorResponse(res);
        }

        if (results.affectedRows > 0) {
            return sendOkResponse(res, 'Album deleted', results[0]);
        }

        return sendNotFoundResponse(res, `Album id ${req.params.id} was not found`);
    });
};
