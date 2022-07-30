import React from "react";
import { Routes, Route } from "react-router";

import Albums from "./components/Albums/Albums";
import AlbumItem from "./components/Albums/AlbumItem";
import AddAlbum from "./components/Albums/AddAlbum";
import Tracks from "./components/Tracks/Tracks";
import EditTrack from "./components/Tracks/EditTrack";
import AddTrack from "./components/Tracks/AddTrack";
import Api from './components/Api/Api';
import { PATHS, getPathByKey } from "./utils/sitemap";


const RouteTree = () => {
    return (
        <Routes>
            <Route path={getPathByKey(PATHS.Api)} element={<Api />} />
            <Route path={getPathByKey(PATHS.Album)} element={<AlbumItem />} />
            <Route path={getPathByKey(PATHS.AddAlbum)} element={<AddAlbum />} />
            <Route path={getPathByKey(PATHS.Albums)} element={<Albums />} />
            <Route path={getPathByKey(PATHS.EditTrack)} element={<EditTrack />} />
            <Route path={getPathByKey(PATHS.AddTrack)} element={<AddTrack />} />
            <Route path={getPathByKey(PATHS.Tracks)} element={<Tracks />} />
            <Route path={getPathByKey(PATHS.Home)} element={<Albums />} />
        </Routes>
    )
};

export default RouteTree;