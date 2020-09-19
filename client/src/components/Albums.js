import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topAlbums } from '../list-music-user';

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    topAlbums()
      .then(
        (data) => {
          console.log('here are the albums', data);
          setAlbums(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, []);
  return (
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
              <span className="album-launch-date">
                {(new Date(album.launch_date).getFullYear())}
              </span>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default Albums;
