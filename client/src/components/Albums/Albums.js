import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAlbums } from '../../api/albums';
import { getRandomImagePath } from '../../utils/image';
import { PATHS, getPathByKey } from "../../utils/sitemap";

import './Albums.css';

function Albums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums().then(albums => {
            setAlbums(albums)
        });
    }, []);

    function handleAddAlbum() {
        return navigate(getPathByKey(PATHS.AddAlbum));
    }

    return (
        <div className="albums">
            <div className="albums__header">
                <h2>Albums</h2>
                <button className="albums__action--add" onClick={handleAddAlbum}>Add Album</button>
            </div>

            {albums && (
                <div className="albums__list">
                    {
                        albums.map((item) => {
                            return (
                                <div className="album__list__item" key={item.album_id}>
                                    <Link to={item.path} className="albums__link">
                                        <div className="albums__item">
                                            <img src={getRandomImagePath(400, 400)} className="albums__item__cover" />
                                            <h2 className="albums__item__name">{item.album_name}</h2>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default Albums;