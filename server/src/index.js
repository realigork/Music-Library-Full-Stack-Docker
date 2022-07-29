import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

import Response from './domain/response.js';
import HttpStatus from './controller/albums.controller.js';
import albumsRoutes from './route/albums.route.js';
import tracksRoutes from './route/tracks.route.js';
import logger from './util/logger.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// Passing ALL (*) to origin is a bad practise. 
// In a real world scenario it would be an array of
// strings that defines which domains are allowed
app.use(cors({ origin: '*' }));

// Send any response to the frontend in a JSON format.
app.use(express.json());

app.use('/albums', albumsRoutes);
app.use('/tracks', tracksRoutes);

app.get('/', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Artlist API v1.0.0'));
});

app.all('*', (req, res) => {
    res
        .status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist'));
});

app.listen(PORT, () => {
    logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});
