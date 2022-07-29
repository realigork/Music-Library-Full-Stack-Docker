# Create a Music Library

Create albums, create music library, assign each music track to individual album.


## API

### Albums
GET /albums
- returns a list of available albums

POST /albums
Body param - name
- create a new album with a name

GET /albums/:id
- returns a specific album item with associated tracks

PUT /albums/:id
Body param - name
- update name of the specific album

DELETE /albums/:id
- delete album by id


### Tracks

GET /tracks
- returns a list of music tracks

POST /tracks
Body params - track_name, artist, genre, album_id (optional)
- create a music track

DELETE /tracks
Body params - id[]
- delete tracks by list of ids

GET /tracks/:id
- returns a track by id

PUT /tracks/:id
Body params - album_name, artist, genre, album_id
- updates a track with passed parameters

PATCH /tracks/resetAlbumTracks
Body params - id[]
- reset album_id from the tracks by list of ids
