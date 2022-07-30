import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS, getPathByKey } from "../../utils/sitemap";

import "./TrackForm.css";

function TrackForm({
    name,
    artist,
    genre,
    albums,
    selectedAlbum = '',
    onChange,
    onCancel,
    onSubmit,
    submitting,
    editing = false
}) {
    const location = useLocation();
    const navigate = useNavigate();

    function handleNewAlbumClick() {
        return navigate(`${getPathByKey(PATHS.AddAlbum)}?backpath=${location.pathname}`)
    }

    const confirmActionLabel = editing ? 'Update' : 'Create';

    return (
        <div className="track-form">
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label>Name: </label>
                    <input type="text" name="trackName" value={name} onChange={onChange} required />
                </fieldset>

                <fieldset>
                    <label>Artist: </label>
                    <input type="text" name="artist" value={artist} onChange={onChange} required />
                </fieldset>

                <fieldset>
                    <label>Genre: </label>
                    <input type="text" name="genre" value={genre} onChange={onChange} required />
                </fieldset>

                <fieldset>
                    <label>Album: </label>
                    <select onChange={onChange} name="album" value={selectedAlbum}>
                        <option value="Not Selected">Not Selected</option>
                        {albums.map(album => <option key={album.album_id} value={album.album_name}>{album.album_name}</option>)}
                    </select>

                    <button className="track-form__new-album-cta btn--small" onClick={handleNewAlbumClick}>
                        Add New Album
                    </button>
                </fieldset>

                <fieldset className="track-form__actions">
                    <button className="btn--secondary" onClick={onCancel}>Cancel</button>
                    <button type="submit" disabled={submitting === true}>{submitting ? 'Submitting...' : confirmActionLabel}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default TrackForm;