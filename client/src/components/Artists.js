import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTops, getAll } from '../list-music-user';
import ArtistsCarousel from './ArtistsCarousel';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    getAll(pathname)
      .then(
        (data) => {
          // console.log('here are the artists');
          setArtists(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
      
      getTops(pathname, 20)
        .then(
          (data) => {
            // console.log('here are the artists');
            setTopArtists(data);
          },
          (error) => {
            console.error('there was an error', error);
          },
        );
  }, [pathname]);
  return (
    <>
      <ArtistsCarousel artists={topArtists} />
      <h2 style={{ marginLeft: '60px' }}>All Artists</h2>
      <ul className="artists-list" style={{ listStyleType: 'none' }}>
        <div className="all-artists">
          {artists.map((artist) => (
            <li key={artist.id}>
              <div className="artist">
                <Link to={`/artist/${artist.id}`}>
                  <img src={`${artist.coverImg}`} alt="Artist" className="artist-cover-img" />
                  <span className="artist-name">{artist.artistName}</span>
                </Link>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}

export default Artists;
