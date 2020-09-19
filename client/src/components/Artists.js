import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topArtists } from '../list-music-user';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    topArtists()
      .then(
        (data) => {
          // console.log('here are the artists');
          setArtists(data[0]);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, []);
  return (
    <ul className="artists-list" style={{ listStyleType: 'none' }}>
      <div className="all-artists">
        {artists.map((artist) => (
          <li key={artist.id}>
            <div className="artist">
              <Link to={`/artist/${artist.id}`}>
                <img src={`${artist.cover_img}`} alt="Artist" className="artist-cover-img" />
                <span className="artist-name">{artist.artist_name}</span>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default Artists;