import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTops, getAll } from '../list-music-user';
import AlbumsCarousel from './AlbumsCarousel';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    getAll(pathname)
      .then(
        (data) => {
          // console.log('here are the albums', data);
          setAlbums(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
    getTops(pathname, 20)
      .then(
        (data) => {
          // console.log('here are the albums', data);
          setTopAlbums(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, [pathname]);
  return (
    <>
      <AlbumsCarousel albums={topAlbums} />
      <h2 style={{ marginLeft: '60px' }}>All Albums</h2>
      <ul className="albums-list" style={{ listStyleType: 'none' }}>
        <div className="all-albums">
          {albums.map((album) => (
            <li key={album.id}>
              <div className="album">
                <Link to={`/album/${album.id}`}>
                  <img src={`${album.coverImg}`} alt="Album Cover" className="album-cover-img" />
                  <span className="album-name">{album.name}</span>
                </Link>
                <Link to={`/artist/${album.artistId}`} className="artist-name">{album.artist.artistName}</Link>
                <span className="album-launch-year">
                  {(new Date(album.releasedAt).getFullYear())}
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
