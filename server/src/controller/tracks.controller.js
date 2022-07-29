import database from '../../config/mysql.config.js';
import Response from '../domain/response.js';
import TRACKS_QUERY from '../query/tracks.query.js';

const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NOT_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export const getTracks = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACKS, (error, results) => {
        if (!results) {
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No tracks found'))
        } else {
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Tracks retrieved', { tracks: results }))
        }
    });
};

export const createTrack = (req, res) => {
    database.query(TRACKS_QUERY.CREATE_TRACK, Object.values(req.body), (error, results) => {
        if (!results) {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred'))
        } else {
            const track = {
                id: results.insertedId,
                ...req.body,
                created_at: new Date()
            };
            res
                .status(HttpStatus.CREATED.code)
                .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Track created', { track }))
        }
    });
};

export const getTrack = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACK, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Track id ${req.params.id} was not found`))
        } else {
            res
                .status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Track retrieved', results[0]))
        }
    });
};

export const updateTrack = (req, res) => {
    database.query(TRACKS_QUERY.SELECT_TRACK, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Track id ${req.params.id} was not found`))
        } else {
            database.query(TRACKS_QUERY.UPDATE_TRACK, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res
                        .status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Track updated', { id: req.params.id, ...req.body }))
                } else {
                    res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`))
                }
            });
        }
    });
};

export const deleteTrack = (req, res) => {
    console.log('---- deleteTrack: ', req.body);
    const ids = req.body.id;
    Promise.all(
        ids.map(async id => {
            await deleteTrackItem(id);
        })
    ).then(() => {
        res
            .status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Track deleteds'))
    }).catch(() => {
        res
            .status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Track was not found`))
    });
};

const deleteTrackItem = (id) => {
    return new Promise((resolve, reject) => {
        database.query(TRACKS_QUERY.DELETE_TRACK, [id], (error, results) => {
            if (error) {
                reject(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Track id ${id} was not found`));
            } else {
                resolve(true);
            }
        });
    });
};

export const resetAlbumTracks = (req, res) => {
    console.log('------- RESET ALBUM TRACKS: ');
    console.log(req.body);
    const ids = req.body.ids;

    Promise.all(
        ids.map(async id => {
            await resetAlbumTrack(id);
        })
    ).then(() => {
        console.log('Items processed');
        console.log('----- send true');
        res
            .status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Track updated'))
    }).catch(() => {
        console.log('----- send Error: resetAlbumTracks');
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`))
    });
}

const resetAlbumTrack = (id) => {
    return new Promise((resolve, reject) => {
        database.query(TRACKS_QUERY.RESET_ALBUM_TRACKS, [id], (error, results) => {
            console.log('------ RESET_ALBUM_TRACKS: id: ', id);
            console.log(error);
            if (error) {
                console.log('----- send Error: resetAlbumTrack');
                reject(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
            } else {
                console.log('----- send true');
                resolve(true)
            }
        });
    });
};

export default HttpStatus;