import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { topPlaylists } from '../list-music-user';
import PlaylistsCarousel from './PlaylistsCarousel';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    topPlaylists()
      .then(
        (data) => {
          // console.log('here are the playlists', data[0]);
          setPlaylists(data);
        },
        (error) => {
          console.error('there was an error', error);
        },

      );
  }, []);
  return (
    <>
      <PlaylistsCarousel playlists={playlists} />
      <h2 style={{ marginLeft: '60px' }}>All Playlists</h2>
      <ul className="playlists-list" style={{ listStyleType: 'none' }}>
        <div className="all-playlists">
          {playlists.map((playlist) => (
            <li key={playlist.playlist_id}>
              <div className="playlist">
                <Link to={`/playlist/${playlist.playlist_id}`}>
                  <img src={`${playlist.cover_img}`} alt="Playlist Cover" className="playlist-cover-img" />
                  <span className="playlist-name">{playlist.playlist_name}</span>
                </Link>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}

export default Playlists;
