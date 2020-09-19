import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { topSongs } from '../list-music-user';

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    topSongs()
      .then(
        (data) => {
          // console.log('here are the songs');
          setSongs(data[0]);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, []);

  return (
    <div className="allSongs">
      <ul className="songs-list" style={{ listStyleType: 'none' }}>
        {songs.map((song) => (
          <li key={song.id}>
            <div className="song">
              <Link to={`/song/${song.id}`} className="song-name">
                Name:
                {song.title}
              </Link>
              <Link to={`/artist/${song.artist_id}`} className="artist-name">
                Artist:
                {song.artist_name}
              </Link>
              {song.featured_artist
                ? (
                  <Link to={`/artist/${song.featured_artist_id}`} className="feartured-artist-name">
                    Featured Artist:
                    {song.featured_artist}
                  </Link>
                )
                : null}
              {song.album_name
                ? (
                  <Link to={`/album/${song.album_id}`} className="album-name">
                    Album:
                    {song.album_name}
                  </Link>
                )
                : null}
              <span className="song-like">
                Like Checkbox
              </span>
              <span className="song-length">
                Length:
                {song.length}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
