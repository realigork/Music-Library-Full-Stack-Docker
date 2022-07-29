import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TrackForm from "./TrackForm";
import { getAlbums } from "../../api/albums";
import { createTrack } from "../../api/tracks";
import { PATHS, getPathByKey } from "../../utils/sitemap";

import "./AddTrack.css";

const TRACK_FIELDS = {
    Name: 'trackName',
    Artist: 'artist',
    Genre: 'genre',
    Album: 'album'
};
function AddTrack() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [albums, setAlbums] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState('');

    useEffect(() => {
        getAlbums().then(albumsData => {
            setAlbums(albumsData);
            setLoading(false);
        });
    }, []);

    function findAlbumId(name) {
        const entry = albums.find(a => a.album_name === name);
        return entry?.album_id || null;
    }

    function handleChange(e) {
        switch (e.target.name) {
            case TRACK_FIELDS.Name:
                setName(e.target.value);
                break;
            case TRACK_FIELDS.Artist:
                setArtist(e.target.value);
                break;
            case TRACK_FIELDS.Genre:
                setGenre(e.target.value);
                break;
            case TRACK_FIELDS.Album:
                setSelectedAlbum(e.target.value);
                break;
        }
    }

    function goBack() {
        return navigate(getPathByKey(PATHS.Tracks));
    }

    function handleCancel() {
        return goBack();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const albumId = findAlbumId(selectedAlbum);
        setSubmitting(true);
        try {
            createTrack(name, artist, genre, albumId).then(res => {
                setSubmitting(false);
                return goBack();
            });
        } catch (e) {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className="add-track">
            <h2>Add New Track</h2>
            <TrackForm
                name={name}
                artist={artist}
                genre={genre}
                albums={albums}
                selectedAlbum={selectedAlbum}
                submitting={submitting}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default AddTrack;