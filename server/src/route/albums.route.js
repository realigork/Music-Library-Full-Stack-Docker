import express from 'express';
import {
    getAlbums,
    createAlbum,
    getAlbum,
    deleteAlbum,
    updateAlbum
} from '../controller/albums.controller.js';

const albumsRoutes = express.Router();

albumsRoutes
    .route('/')
    .get(getAlbums)
    .post(createAlbum);

albumsRoutes
    .route('/:id')
    .get(getAlbum)
    .put(updateAlbum)
    .delete(deleteAlbum);

export default albumsRoutes;