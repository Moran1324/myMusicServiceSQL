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
        const mainSongs = data.filter(song => {
          return song.artist_id === parseInt(params.id);
        })
        setArtistSongs(mainSongs);
        setArtistName(mainSongs[0].artist_name);

        const featuredSongs = data.filter(song => {
          return song.featured_artist_id === parseInt(params.id);
        });
        if (featuredSongs.length) {
          setArtistFeaturedSongs(featuredSongs);
        };
        setArtistImg(data[0].artist_img);
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
            {artistSongs.map((song) => (
              <li key={song.song_id}>
                <div className="artist-song">
                  <Link to={`/song/${song.song_id}?type=artist&id=${song.artist_id}`} className="song-name">
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
          {hasFeaturedSongsChecker ? (
            <>
              <h2>Featured</h2>
              <ul className="artist-featured-songs-list" style={{ listStyleType: 'none' }}>
                {artistFeaturedSongs.map((song) => (
                  <li key={song.song_id}>
                    <div className="artist-song">
                      <Link to={`/song/${song.song_id}`} className="song-name">
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
            </>
          ) : null
          }
        </div>
      }
    </>
  );
}

export default SingleArtist;
