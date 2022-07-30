import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

import albumsRoutes from './route/albums.route.js';
import tracksRoutes from './route/tracks.route.js';
import apiRoutes from './route/api.route.js';
import logger from './util/logger.js';
import { sendOkResponse, sendNotFoundResponse } from './util/http.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;
const app = express();

// Passing ALL (*) to origin is a bad practise. 
// In a real world scenario it would be an array of
// strings that defines which domains are allowed
app.use(cors({ origin: '*' }));

// Send any response to the frontend in a JSON format.
app.use(express.json());

app.use('/albums', albumsRoutes);
app.use('/tracks', tracksRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    sendOkResponse(res, 'API v1.0.0');
});

app.all('*', (req, res) => {
    sendNotFoundResponse(res, 'Route does not exist');
});

app.listen(PORT, () => {
    logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});
