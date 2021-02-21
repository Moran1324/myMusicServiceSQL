import React, { useEffect, useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { getSongsListById } from '../list-music-user';
import { totalLengthCalc } from '../time-calc-func';

function SingleAlbum() {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [albumImg, setAlbumImg] = useState('');
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
        setAlbumSongs(data.songs);
        setAlbumName(data.name);
        setAlbumImg(data.coverImg);
        setAlbumArtist(data.artist.artistName);
        setAlbumSongsCount(data.songs.length);
        setAlbumYear(new Date(data.releasedAt).getFullYear());
        setAlbumArtistId(data.artistId);
        

        const tempLengthsArray = [];
        data.songs.map(song => (
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
            {albumSongs.length && albumSongs.map((song) => (
              <li key={song.id}>
                <div className="album-song">
                  <Link to={`/song/${song.id}?type=album&id=${song.albumId}`} className="song-name">
                    Name:
                    {song.title}
                  </Link>
                  <Link to={`/artist/${song.artistId}`} className="artist-name">
                    Artist:
                    {albumArtist}
                  </Link>
                  {song.featuredArtist
                    ? (
                      <Link to={`/artist/${song.featuredArtistId}`} className="feartured-artist-name">
                        Featured Artist:
                        {song.featuredArtist.artistName}
                      </Link>
                    )
                    : null}
                  {albumName
                    ? (
                      <Link to={`/album/${song.albumId}`} className="album-name">
                        Album:
                        {albumName}
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
