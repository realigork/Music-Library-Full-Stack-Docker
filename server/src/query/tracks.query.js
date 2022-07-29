// It is not good idea to fetch every entry in a table. 
// Always limit the amount you fetch and fetch more if needed.
const TRACKS_QUERY = {
    SELECT_TRACKS: 'SELECT * FROM tracks LEFT JOIN albums ON tracks.album_id = albums.album_id',
    SELECT_TRACK: 'SELECT * FROM tracks LEFT JOIN albums ON tracks.album_id = albums.album_id WHERE tracks.track_id = ?',
    CREATE_TRACK: 'INSERT INTO tracks (track_name, artist, genre, album_id) VALUES (?, ?, ?, ?)',
    UPDATE_TRACK: 'UPDATE tracks SET track_name = ?, artist = ?, genre = ?, album_id = ? WHERE track_id = ?',
    DELETE_TRACK: 'DELETE FROM tracks WHERE track_id = ?',
    SET_TRACK_ALBUM: 'UPDATE tracks SET album_id = ? WHERE track_id = ?',
    RESET_ALBUM_TRACKS: 'UPDATE tracks SET album_id = NULL WHERE track_id = ?'
};

export default TRACKS_QUERY;
