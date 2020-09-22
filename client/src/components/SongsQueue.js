import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


function SongsQueue({ songsArray }) {
  const [queueSongs, setQueueSongs] = useState([]);

  const { search, pathname } = useLocation();

  useEffect(() => {
    setQueueSongs(songsArray);
    // console.log(songsArray)
  }, [pathname, search, songsArray])

  return (
    <div className="songs-queue">
      <h2>Up Next</h2>
      {queueSongs.map(song => (
        <div key={song.song_id} className="queue-song">
          <img src={song.artist_img} className="queue-song-img" alt="Artist"/>
          <Link to={`/song/${song.song_id}${search}`} className="queue-song-name">
            <h4>{song.title}</h4>
          </Link>
          <Link to={`/artist/${song.artist_id}`} className="queue-song-artist">
            {song.artist_name}
          </Link>
          <span className="queue-song-length">{song.length}</span>
        </div>
      ))}
    </div>
  )
}

export default SongsQueue
