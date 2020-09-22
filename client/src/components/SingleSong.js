import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, Redirect } from 'react-router-dom';
import { getSongsListById } from '../list-music-user';
import ReactPlayer from 'react-player';
import SongsQueue from './SongsQueue';

function SingleSong() {
  const [currentSong, setCurrentSong] = useState({});
  const [songName, setSongName] = useState('');
  const [songLength, setSongLength] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songAlbum, setSongAlbum] = useState('');
  const [songImg, setSongImg] = useState('');
  const [songLink, setSongLink] = useState('');
  const [queueSongs, setQueueSongs] = useState([])
  const [error, setError] = useState(false);

  const { pathname, search } = useLocation();
  const params = useParams();

  const currentSongSetter = (songDataObj) => {
    setCurrentSong(songDataObj);
    setSongName(songDataObj.title);
    setSongLength(songDataObj.length);
    setSongArtist(songDataObj.artist_name)
    if (songDataObj.album_id) {
      setSongAlbum(songDataObj.album_name);
      setSongImg(songDataObj.album_img);
    } else {setSongImg(songDataObj.artist_img)};
    setSongLink(songDataObj.youtube_link);
  }

  useEffect(() => {
    getSongsListById(`${pathname}${search}`)
    .then(
      (data) => {
        // console.log('data', data)
        // console.log('params', params)
        const tempSong = data.find(song => {
          return parseInt(song.song_id) === parseInt(params.id)
        })
        currentSongSetter(tempSong)
        const tempQueue = data.filter(song => {
          return parseInt(song.song_id) !== parseInt(params.id)
        })
        // console.log('songimg', songImg)
        setQueueSongs(tempQueue)
      },
      (error) => {
        console.error('there was an error', error);
        alert('No Such Song');
        setError(true);
      },
    );
  }, [pathname, search, songImg, params]);

  return (
    <>
      {error ? <Redirect to="/" /* implement where user came from using querry params */ /> :
      <div className="song-page">
        <div className="song-player">
          <ReactPlayer
          url={songLink}
          playing
          controls
          width='300px'
          height='300px'
          />
        </div>
        <div className="song-info">
          <span className="song-title-img">
            <h2 className="song-name">{songName}</h2>
            <img src={songImg} alt="Album or Artist" className="song-img" />
          </span>
          <div className="song-artist">
          <Link to={`/artist/${currentSong.artist_id}`}>{songArtist}</Link>
          {songAlbum ?
          <Link to={`/artist/${currentSong.album_id}`}>{' - '}{songAlbum}</Link> 
           : null}
          </div>
          <span className="song-length">{songLength}</span>
        </div>
        <SongsQueue songsArray={queueSongs}/>
      </div>
      }
    </>
  );
}

export default SingleSong;
