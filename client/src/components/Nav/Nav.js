import React from "react";
import { Link } from 'react-router-dom';
import { PATHS, getPathByKey } from "../../utils/sitemap";

import "./Nav.css";

function Nav() {
    return (
        <div className="nav">
            <Link to={getPathByKey(PATHS.Home)} className="nav__item">
                <span>Albums</span>
            </Link>
            <Link to={getPathByKey(PATHS.Tracks)} className="nav__item">
                <span>Music Library</span>
            </Link>
        </div>
    )
}

export default Nav;