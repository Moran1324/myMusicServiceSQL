import React, { useEffect, useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { getSongsListById } from '../list-music-user';
import { totalLengthCalc } from '../time-calc-func';

function SinglePlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImg, setPlaylistImg] = useState('');
  const [playlistLength, setPlaylistLength] = useState('00:00:00');
  const[playlistSongsCount, setPlaylistSongsCount] = useState();
  const [error, setError] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    getSongsListById(pathname)
    .then(
      (data) => {
        // console.log('data', data)
        setPlaylistSongs(data);
        setPlaylistName(data[0].playlist_name);
        setPlaylistImg(data[0].playlist_img);
        setPlaylistSongsCount(data.length);        

        const tempLengthsArray = [];
        data.map(song => {
          tempLengthsArray.push(song.length)
        });
        console.log(totalLengthCalc(tempLengthsArray));
        setPlaylistLength(totalLengthCalc(tempLengthsArray));
      },
      (error) => {
        console.error('there was an error', error);
        alert('No Such Playlist');
        setError(true);
      },
    );
  }, [pathname]);
  return (
    <>
      {error ? <Redirect to="/playlist" /> :
        <div className="playlist-page">
          <div className="playlist-header">
            <img src={`${playlistImg}`} className="playlist-img"/>
            <h1>{playlistName}</h1>
            <div className="playlist-info">
              <span className="playlist-count">{playlistSongsCount}</span>
              {' - '}
              <span className="playlist-lenght">{playlistLength}</span>
            </div>
          </div>
          <ul className="playlist-songs-list" style={{ listStyleType: 'none' }}>
            {playlistSongs.map((song) => (
              <li key={song.id}>
                <div className="playlist-song">
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
      }
    </>
  );
}

export default SinglePlaylist;
