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
        if (data.length === 0) {
          alert('This Playlist is Empty');
          setError(true);
          return;
        }
        setPlaylistSongs(data);
        setPlaylistName(data[0].playlist[0].name);
        setPlaylistImg(data[0].playlist[0].coverImg);
        setPlaylistSongsCount(data.length);        

        const tempLengthsArray = [];
        data.map(song => (
          tempLengthsArray.push(song.length)
        ));
        // console.log(totalLengthCalc(tempLengthsArray));
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
            <img src={`${playlistImg}`} alt="Playlist" className="playlist-img"/>
            <h1>{playlistName}</h1>
            <div className="playlist-info">
              <span className="playlist-count">{`${playlistSongsCount} songs`}</span>
              {' - '}
              <span className="playlist-lenght">{`Total ${playlistLength}`}</span>
            </div>
          </div>
          <ul className="playlist-songs-list" style={{ listStyleType: 'none' }}>
            {playlistSongs.map((song) => (
              <li key={song.id}>
                <div className="playlist-song">
                  <Link to={`/song/${song.id}?type=playlist&id=${song.playlist[0].id}`} className="song-name">
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
      }
    </>
  );
}

export default SinglePlaylist;
