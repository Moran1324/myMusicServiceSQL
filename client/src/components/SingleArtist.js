import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, Redirect } from 'react-router-dom';
import { getSongsListById } from '../list-music-user';

function SingleArtist() {
  const [artistSongs, setArtistSongs] = useState([]);
  const [artistFeaturedSongs, setArtistFeaturedSongs] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [artistImg, setArtistImg] = useState('');
  const [error, setError] = useState(false);

  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    getSongsListById(pathname)
    .then(
      (data) => {
        // if (data.length < 1);
        const mainSongs = data.songs.filter(song => {
          return song.artistId === parseInt(params.id);
        })
        setArtistSongs(mainSongs);
        setArtistName(data.artistName);

        const featuredSongs = data.songs.filter(song => {
          return song.featuredArtistId === parseInt(params.id);
        });
        if (featuredSongs.length) {
          setArtistFeaturedSongs(featuredSongs);
        };
        setArtistImg(data.coverImg);
      },
      (error) => {
        console.error('there was an error', error);
        alert('No Such Artist');
        setError(true);
      },
    );
  }, [pathname, params.id]);

  const hasFeaturedSongsChecker = (() => {
    if (artistFeaturedSongs.length < 1) {
      return false
    } else return true
  })();

  return (
    <>
      {error ? 
        <Redirect to="/artist" /> :
        <div className="artist-page">
          <img src={`${artistImg}`} alt="Artist" className="artist-img"/>
          <h1>{artistName}</h1>
          <ul className="artist-songs-list" style={{ listStyleType: 'none' }}>
            {artistSongs.length && artistSongs.map((song) => (
              <li key={song.id}>
                <div className="artist-song">
                  <Link to={`/song/${song.id}?type=artist&id=${song.artistId}`} className="song-name">
                    Name:
                    {song.title}
                  </Link>
                  <Link to={`/artist/${song.artistId}`} className="artist-name">
                    Artist:
                    {artistName}
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
                      <Link to={`/album/${song.album.id}`} className="album-name">
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
          {hasFeaturedSongsChecker ? (
            <>
              <h2>Featured</h2>
              <ul className="artist-featured-songs-list" style={{ listStyleType: 'none' }}>
                {artistFeaturedSongs.map((song) => (
                  <li key={song.id}>
                    <div className="artist-song">
                      <Link to={`/song/${song.id}`} className="song-name">
                        Name:
                        {song.title}
                      </Link>
                      <Link to={`/artist/${song.artistId}`} className="artist-name">
                        Artist:
                        {song.artistName}
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
            </>
          ) : null
          }
        </div>
      }
    </>
  );
}

export default SingleArtist;
