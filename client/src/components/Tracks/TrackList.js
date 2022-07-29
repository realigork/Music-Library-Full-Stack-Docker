import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS, getPathByKey } from "../../utils/sitemap";
import { removeArrayItem } from "../../utils/array";

import "./TrackList.css";

function TrackList({
    tracks,
    onDelete,
    hideAlbumColumn = true,
    editLabel = 'Edit',
    deleteLabel = 'Delete'
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [tracksSelected, setTracksSelected] = useState([]);

    function handleEditTrackClick(id) {
        return navigate(`${getPathByKey(PATHS.EditTrack, { id })}?backpath=${location.pathname}`)
    }

    function handleDeleteTrackClick(id) {
        setTracksSelected([]);
        onDelete([id]);
    }

    function handleDeleteSelectedTracks() {
        setTracksSelected([]);
        onDelete(tracksSelected);
    }

    function onSelect(e) {
        let selected = tracksSelected.slice(0);
        if (e.target.checked) {
            selected.push(e.target.value);
        } else {
            selected = removeArrayItem(selected, e.target.value);
        }

        setTracksSelected(selected);
    }

    if (!tracks || tracks.length < 1) {
        return undefined;
    }

    return (
        <div className="track-list-container">
            {tracks?.length > 0 && (
                <div>
                    <h4>Tracks</h4>
                    <div className="track-list">
                        <div className="track-list__item track-list__item--header">
                            <div></div>
                            <div>Name</div>
                            <div>Artist</div>
                            <div>Genre</div>
                            {!hideAlbumColumn && (<div>Album</div>)}
                            <div>Actions</div>
                        </div>
                        {tracks.map(track => {
                            return (
                                <div key={track.track_id} className="track-list__item">
                                    <div><input type="checkbox" value={track.track_id} onChange={onSelect} /></div>
                                    <div>{track.track_name}</div>
                                    <div>{track.artist}</div>
                                    <div>{track.genre}</div>
                                    {!hideAlbumColumn && (<div>{track.album_name}</div>)}
                                    <div>
                                        <button
                                            className="track-list__item__action track-list__item__action--edit"
                                            onClick={() => handleEditTrackClick(track.track_id)}
                                        >
                                            {editLabel}
                                        </button>
                                        <button
                                            className="track-list__item__action track-list__item__action--delete"
                                            onClick={() => handleDeleteTrackClick(track.track_id)}
                                        >
                                            {deleteLabel}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {tracksSelected.length > 0 && (<button onClick={handleDeleteSelectedTracks} className="btn--small">Delete Selected</button>)}
                </div>
            )}
        </div>
    )
}

export default TrackList;