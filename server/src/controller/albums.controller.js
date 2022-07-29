import database from '../../config/mysql.config.js';
import Response from '../domain/response.js';
import ALBUMS_QUERY from '../query/albums.query.js';

const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NOT_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export const getAlbums = (req, res) => {
    database.query(ALBUMS_QUERY.SELECT_ALBUMS, (error, results) => {
        if (!results) {
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No albums found'))
        } else {
            const albums = results.map(album => {
                return {
                    ...album,
                    path: `/albums/${album.album_id}`
                }
            })
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Albums retrieved', { albums }))
        }
    });
};

export const createAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.CREATE_ALBUM, Object.values(req.body), (error, results) => {
        console.log('---- createAlbum: ', error, results)
        if (!results) {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred'))
        } else {
            const album = {
                id: results.insertedId,
                ...req.body,
                created_at: new Date()
            };
            res
                .status(HttpStatus.CREATED.code)
                .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Album created', { album }))
        }
    });
};

export const getAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.SELECT_ALBUM, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Album id ${req.params.id} was not found`))
        } else {
            const tracks = results
                .map(track => {
                    if (!track.track_id) {
                        return undefined;
                    }

                    return {
                        track_id: track.track_id,
                        track_name: track.track_name,
                        artist: track.artist,
                        genre: track.genre
                    }
                })
                .filter(track => track !== undefined);

            const data = {
                album_id: results[0].album_id,
                album_name: results[0].album_name,
                tracks
            }
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Album retrieved', data))
        }
    });
};

export const updateAlbum = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl} , fetching album`);
    database.query(ALBUMS_QUERY.SELECT_ALBUM, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Album id ${req.params.id} was not found`))
        } else {
            logger.info(`${req.method} ${req.originalUrl} , updating album`);
            database.query(ALBUMS_QUERY.UPDATE_ALBUM, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res
                        .status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Album updated', { id: req.params.id, ...req.body }))
                } else {
                    logger.error(error.message);
                    res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`))
                }
            });
        }
    });
};

export const deleteAlbum = (req, res) => {
    database.query(ALBUMS_QUERY.DELETE_ALBUM, [req.params.id], (error, results) => {
        console.log('--------- deleteAlbum');
        console.log(error);
        console.log(results);
        if (results.affectedRows > 0) {
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Album deleted', results[0]))
        } else {
            res
                .status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Album id ${req.params.id} was not found`))
        }
    });
};

export default HttpStatus;