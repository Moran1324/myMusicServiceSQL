import React, { useEffect, useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { getSongsListById } from '../list-music-user';
import { totalLengthCalc } from '../time-calc-func';

function SingleAlbum() {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [albumImg, setalbumImg] = useState('');
  const [albumLength, setAlbumLength] = useState('00:00:00');
  const [albumArtist, setAlbumArtist] = useState('');
  const[albumSongsCount, setAlbumSongsCount] = useState();
  const [albumYear, setAlbumYear] = useState();
  const [albumArtistId, setAlbumArtistId] = useState();
  const [error, setError] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    getSongsListById(pathname)
    .then(
      (data) => {
        // console.log('data', data, data.length)
        setAlbumSongs(data);
        setAlbumName(data[0].album_name);
        setalbumImg(data[0].album_img);
        setAlbumArtist(data[0].artist_name);
        setAlbumSongsCount(data.length);
        setAlbumYear(new Date(data[0].album_year).getFullYear());
        setAlbumArtistId(data[0].artist_id);
        

        const tempLengthsArray = [];
        data.map(song => (
          tempLengthsArray.push(song.length)
        ));
        // console.log(totalLengthCalc(tempLengthsArray));
        setAlbumLength(totalLengthCalc(tempLengthsArray));
      },
      (error) => {
        console.error('there was an error', error);
        alert('No Such Album');
        setError(true);
      },
    );
  }, [pathname]);
  
  return (
    <>
      {error ? 
        <Redirect to="/album" /> :
        <div className="album-page">
          <div className="album-header">
            <img src={`${albumImg}`} alt="Album" className="album-img"/>
            <h1>{albumName}</h1>
            <Link to={`/artist/${albumArtistId}`} className="album-artist">
              {albumArtist}
            </Link>
            <span className="album-year">{albumYear}</span>
            <div className="album-info">
              <span className="album-count">{`${albumSongsCount} songs`}</span>
              {' - '}
              <span className="album-lenght">{`Total ${albumLength}`}</span>
            </div>
          </div>
          <ul className="artist-songs-list" style={{ listStyleType: 'none' }}>
            {albumSongs.map((song) => (
              <li key={song.song_id}>
                <div className="album-song">
                  <Link to={`/song/${song.song_id}?type=album&id=${song.album_id}`} className="song-name">
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

export default SingleAlbum;
