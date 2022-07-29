// It is not good idea to fetch every entry in a table. 
// Always limit the amount you fetch and fetch more if needed.
const ALBUMS_QUERY = {
    SELECT_ALBUMS: 'SELECT * FROM albums ORDER by created_at DESC LIMIT 100',
    SELECT_ALBUM: 'SELECT * FROM albums LEFT JOIN tracks ON albums.album_id = tracks.album_id WHERE albums.album_id = ?',
    CREATE_ALBUM: 'INSERT INTO albums (album_name) VALUES (?)',
    UPDATE_ALBUM: 'UPDATE albums SET album_name = ?',
    DELETE_ALBUM: 'DELETE FROM albums WHERE album_id = ?'
};

export default ALBUMS_QUERY;
