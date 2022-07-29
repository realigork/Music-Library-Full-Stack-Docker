import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TrackList from './TrackList';
import { deleteTrack } from "../../api/tracks";
import { getTracks } from "../../api/tracks";
import { PATHS, getPathByKey } from "../../utils/sitemap";
import "./Tracks.css";

function Tracks() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        getTracks().then(tracks => {
            setData(tracks);
        });
    }, []);

    function handleAddTrack() {
        return navigate(getPathByKey(PATHS.AddTrack));
    }

    function onDeleteTrack(ids) {
        deleteTrack(ids)
            .then(() => getTracks())
            .then(tracks => {
                setData(tracks);
            });
    }

    return (
        <div className="tracks">
            <div className="tracks__header">
                <h2>Music Library</h2>
                <button className="tracks__header__action--add" onClick={handleAddTrack}>Add Track</button>
            </div>

            <TrackList tracks={data} hideAlbumColumn={false} onDelete={onDeleteTrack} />
        </div>
    )
}

export default Tracks;