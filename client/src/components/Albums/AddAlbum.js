import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { createAlbum } from '../../api/albums';
import { PATHS, getPathByKey } from "../../utils/sitemap";

import "./AddAlbum.css";

function AddAlbum() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (submitting) {
            return;
        }

        if (name !== '') {
            setSubmitting(true);
            createAlbum(name).then(res => {
                setName('');
                setSubmitting(false);
                const backpath = location.search.split('?backpath=').pop();
                const path = backpath || getPathByKey(PATHS.Home);
                return navigate(path);
            });
        }
    }

    return (
        <div className="add-album">
            <h2>Add New Album</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="albumId">Name:</label>
                    <input id="albumId" name="albumName" type="text" onChange={handleChange} required />
                </fieldset>

                <fieldset>
                    <button type="submit" disabled={submitting === true}>{submitting ? 'Submitting...' : 'Create'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AddAlbum;