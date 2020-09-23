import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTops } from '../list-music-user';
import AlbumsCarousel from './AlbumsCarousel';

function Albums() {
  const [albums, setAlbums] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    getTops(pathname)
      .then(
        (data) => {
          // console.log('here are the albums', data);
          setAlbums(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, [pathname]);
  return (
    <>
      <AlbumsCarousel albums={albums} />
      <h2 style={{ marginLeft: '60px' }}>All Albums</h2>
      <ul className="albums-list" style={{ listStyleType: 'none' }}>
        <div className="all-albums">
          {albums.map((album) => (
            <li key={album.id}>
              <div className="album">
                <Link to={`/album/${album.id}`}>
                  <img src={`${album.cover_img}`} alt="Album Cover" className="album-cover-img" />
                  <span className="album-name">{album.album_name}</span>
                </Link>
                <Link to={`/artist/${album.artist_id}`} className="artist-name">{album.artist_name}</Link>
                <span className="album-launch-year">
                  {(new Date(album.launch_date).getFullYear())}
                </span>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}

export default Albums;
