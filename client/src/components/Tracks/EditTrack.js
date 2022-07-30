import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TrackForm from "./TrackForm";
import Spinner from '../Spinner/Spinner';
import { getAlbums } from '../../api/albums';
import { getTrack, updateTrack } from "../../api/tracks";
import { PATHS, getPathByKey } from "../../utils/sitemap";
import "./EditTrack.css";

const TRACK_FIELDS = {
    Name: 'trackName',
    Artist: 'artist',
    Genre: 'genre',
    Album: 'album'
};

function EditTrack() {
    const location = useLocation();
    const locationParams = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [trackName, setTrackName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getTrack(locationParams.id).then(trackData => {
            if (!trackData) {
                setNotFound(true)
            } else {
                getAlbums().then(albumsData => {
                    setAlbums(albumsData);
                    setTrackName(trackData.track_name);
                    setArtist(trackData.artist);
                    setGenre(trackData.genre);
                    setSelectedAlbum(trackData.album_name || '');
                });
            }

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
                setTrackName(e.target.value);
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
        const backpath = location.search.split('?backpath=').pop();
        const path = backpath || getPathByKey(PATHS.Tracks);
        return navigate(path);
    }

    function handleCancel() {
        return goBack();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const albumId = findAlbumId(selectedAlbum);
        setSubmitting(true);
        try {
            updateTrack(trackName, artist, genre, albumId, locationParams.id).then(res => {
                setSubmitting(false);
                return goBack()
            })
        } catch (e) {
            console.error('Error submitting a form: ', e);
            setSubmitting(false);
        }
    }

    if (loading) {
        return <Spinner />
    }

    if (notFound) {
        return (
            <div>
                <h2>Track Not Found!</h2>
                <button onClick={handleCancel}>Go back</button>
            </div>
        )
    }

    return (
        <div className="edit-track">
            <h2>Edit Track</h2>
            <TrackForm
                name={trackName}
                artist={artist}
                genre={genre}
                albums={albums}
                selectedAlbum={selectedAlbum}
                submitting={submitting}
                editing={true}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditTrack;