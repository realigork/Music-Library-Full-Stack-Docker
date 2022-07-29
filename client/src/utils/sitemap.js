export const PATHS = {
    Home: 'Home',
    Albums: 'Albums',
    Album: 'Album',
    EditAlbum: 'EditAlbum',
    AddAlbum: 'AddAlbum',
    Tracks: 'Tracks',
    EditTrack: 'EditTrack',
    AddTrack: 'AddTrack',
}

const SITEMAP = {
    [PATHS.Home]: { path: '/' },
    [PATHS.Albums]: { path: '/albums' },
    [PATHS.Album]: { path: 'albums/:id' },
    [PATHS.EditAlbum]: { path: '/albums/edit/:id' },
    [PATHS.AddAlbum]: { path: '/albums/add' },
    [PATHS.Tracks]: { path: '/tracks' },
    [PATHS.EditTrack]: { path: '/tracks/edit/:id' },
    [PATHS.AddTrack]: { path: '/tracks/add' },
};

export const getPathByKey = (key, params = {}) => {
    if (!(key in SITEMAP)) {
        return false;
    }

    let path = SITEMAP[key].path;
    if (Object.keys(params).length) {
        for (let objectKey in params) {
            path = path.replace(`:${objectKey}`, params[objectKey]);
        }
    }

    return path;
}