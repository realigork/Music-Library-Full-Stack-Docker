import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import TrackList from '../Tracks/TrackList';
import { getAlbum, deleteAlbum } from '../../api/albums';
import { deleteTracksFromAlbum } from "../../api/tracks";
import { getRandomImagePath } from '../../utils/image';
import { PATHS, getPathByKey } from "../../utils/sitemap";

import "./AlbumItem.css";

function AlbumItem() {
    const location = useParams();
    const navigate = useNavigate();
    const [albumData, setAlbumData] = useState({});
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    useEffect(() => {
        getAlbum(location.id).then(data => {
            setAlbumData(data);
        });
    }, []);

    function toggleDeleteWarning(isShowing) {
        setShowDeleteWarning(isShowing);
    }

    async function handleDeleteAlbum() {
        // First remove items from the album
        const trackIds = albumData.tracks.map(track => track.track_id);
        if (trackIds.length) {
            await deleteTracksFromAlbum(trackIds);
        }

        return deleteAlbum(location.id).then(res => {
            setShowDeleteWarning(false);
            return navigate(getPathByKey(PATHS.Home));
        });
    }

    function onDeleteTrack(ids) {
        deleteTracksFromAlbum(ids)
            .then(() => getAlbum(location.id))
            .then(data => {
                setAlbumData(data);
            });
    }

    if (!albumData) {
        return <div>Loading...</div>
    }

    return (
        <div className="album-item">
            {showDeleteWarning && (
                <Dialog
                    title="Delete Album"
                    text="Are you sure?"
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={handleDeleteAlbum}
                    onCancel={() => toggleDeleteWarning(false)}
                />
            )}
            <div className="album-item__header">
                <div className="album-item__header__image">
                    <img src={getRandomImagePath(150, 150)} className="albums-item__cover" />
                </div>
                <div className="album-item__header__text">
                    <h2>Album: {albumData.album_name}</h2>
                    <p>Removing track from album does not delete it from the library</p>
                </div>
                <button onClick={() => toggleDeleteWarning(true)}>Delete album</button>
            </div>

            <TrackList tracks={albumData.tracks} onDelete={onDeleteTrack} deleteLabel={'Remove'} />
        </div>
    );
}

export default AlbumItem;