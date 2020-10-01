import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTops, getAll } from '../list-music-user';
import PlaylistsCarousel from './PlaylistsCarousel';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    getAll(pathname)
      .then(
        (data) => {
          // console.log('here are the playlists', data[0]);
          setPlaylists(data);
        },
        (error) => {
          console.error('there was an error', error);
        },

      );
    getTops(pathname, 20)
      .then(
        (data) => {
          // console.log('here are the playlists', data[0]);
          setTopPlaylists(data);
        },
        (error) => {
          console.error('there was an error', error);
        },

      );
  }, [pathname]);
  return (
    <>
      <PlaylistsCarousel playlists={topPlaylists} />
      <h2 style={{ marginLeft: '60px' }}>All Playlists</h2>
      <ul className="playlists-list" style={{ listStyleType: 'none' }}>
        <div className="all-playlists">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <div className="playlist">
                <Link to={`/playlist/${playlist.id}`}>
                  <img src={`${playlist.coverImg}`} alt="Playlist Cover" className="playlist-cover-img" />
                  <span className="playlist-name">{playlist.name}</span>
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
