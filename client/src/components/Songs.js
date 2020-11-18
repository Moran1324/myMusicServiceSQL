import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTops, getAll } from '../list-music-user';
import SongsCarousel from './SongsCarousel';

function Songs() {
  const [songs, setSongs] = useState([]);
  const [topSongs, setTopSongs] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    getAll(pathname)
      .then(
        (data) => {
          // console.log('here are the songs');
          setSongs(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
    getTops(pathname, 20)
      .then(
        (data) => {
          // console.log('here are the songs');
          setTopSongs(data);
        },
        (error) => {
          console.error('there was an error', error);
        },
      );
  }, [pathname]);

  return (
    <>
      <SongsCarousel songs={topSongs} />
      <h2 style={{ marginLeft: '60px' }}>All Songs</h2>
      <div className="allSongs">
        <ul className="songs-list" style={{ listStyleType: 'none' }}>
          {songs.map((song) => (
            <li key={song.id}>
              <div className="song">
                <Link to={`/song/${song.id}?type=allSongs`} className="song-name">
                  Name:
                  {song.title}
                </Link>
                <Link to={`/artist/${song.artistId}`} className="artist-name">
                  Artist:
                  {song.artist.artistName}
                </Link>
                {song.featuredArtist
                  ? (
                    <Link to={`/artist/${song.featuredArtistId}`} className="feartured-artist-name">
                      Featured Artist:
                      {song.featuredArtist.artistName}
                    </Link>
                  )
                  : null}
                {song.album
                  ? (
                    <Link to={`/album/${song.albumId}`} className="album-name">
                      Album:
                      {song.album.name}
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
    </>
  );
}

export default Songs;
