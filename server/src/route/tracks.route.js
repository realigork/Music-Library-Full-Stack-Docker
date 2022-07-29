import express from 'express';
import {
    getTracks,
    createTrack,
    getTrack,
    deleteTrack,
    updateTrack,
    resetAlbumTracks
} from '../controller/tracks.controller.js';

const tracksRoutes = express.Router();

tracksRoutes
    .route('/')
    .get(getTracks)
    .post(createTrack)
    .delete(deleteTrack);

tracksRoutes
    .route('/:id')
    .get(getTrack)
    .put(updateTrack);

tracksRoutes
    .route('/resetAlbumTracks')
    .patch(resetAlbumTracks);

export default tracksRoutes;