import { sendOkResponse } from '../util/http.js';

export const getApi = (req, res) => {
    return sendOkResponse(res, 'API retrieved', { api: API });
};

const API = [
    {
        name: 'Albums',
        items: [
            {
                description: 'Retrieve a list of albums',
                path: '/albums',
                method: 'GET',
                status: [
                    { code: 200, message: 'Retrieves a list of albums' },
                    { code: 500, message: 'Internal Server Error' },
                ]
            },
            {
                description: 'Create an album',
                path: '/albums',
                method: 'POST',
                body: { 'album_name': 'string;' },
                status: [
                    { code: 201, message: 'Album created' },
                    { code: 500, message: 'Internal Server Error' },
                ]
            },
            {
                description: 'Retrieve album by ID',
                path: '/albums/:id',
                method: 'GET',
                status: [
                    { code: 200, message: 'Album retrieved by ID' },
                    { code: 404, message: 'Album not found' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
            {
                description: 'Update album by ID',
                path: '/albums/:id',
                method: 'PUT',
                body: { 'album_name': 'string;' },
                status: [
                    { code: 200, message: 'Album updated' },
                    { code: 404, message: 'Album not found' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
            {
                description: 'Delete an album',
                path: '/albums/:id',
                method: 'DELETE',
                status: [
                    { code: 200, message: 'Album delete by ID' },
                    { code: 404, message: 'Album not found' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
        ]
    },
    {
        name: 'Tracks',
        items: [
            {
                description: 'Retrieve a list of music tracks',
                path: '/tracks',
                method: 'GET',
                status: [
                    { code: 200, message: 'Retrieves a list of music tracks' },
                    { code: 500, message: 'Internal Server Error' },
                ]
            },
            {
                description: 'Create a music track with specified parameters',
                path: '/tracks',
                method: 'POST',
                body: {
                    'track_name': 'string;',
                    'artist': 'string;',
                    'genre': 'string;',
                    'album_id': 'number;'
                },
                status: [
                    { code: 201, message: 'Track created' },
                    { code: 500, message: 'Internal Server Error' },
                ]
            },
            {
                description: 'Retrieve a music track by ID',
                path: '/tracks/:id',
                method: 'GET',
                status: [
                    { code: 200, message: 'Track retrieved by ID' },
                    { code: 404, message: 'Track not found' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
            {
                description: 'Update a music track',
                path: '/tracks/:id',
                method: 'PUT',
                body: {
                    'track_name': 'string;',
                    'artist': 'string;',
                    'genre': 'string;',
                    'album_id': 'number;'
                },
                status: [
                    { code: 200, message: 'Track updated' },
                    { code: 404, message: 'Track not found' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
            {
                description: 'Delete one or more music tracks by sending the list of IDs',
                path: '/tracks',
                method: 'DELETE',
                body: { 'id': 'string[];' },
                status: [
                    { code: 200, message: 'Tracks deleted by ID' },
                    { code: 404, message: 'Album not found' }
                ]
            },
            {
                description: 'Remove one or more music tracks from their albums',
                path: '/tracks/resetAlbumTracks',
                method: 'PATCH',
                body: { 'ids': 'string[];' },
                status: [
                    { code: 200, message: 'Tracks with specified IDs removed from their albums' },
                    { code: 500, message: 'Internal Server Error' }
                ]
            },
        ]
    }
];