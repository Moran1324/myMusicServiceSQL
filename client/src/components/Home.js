import React, { useState, useEffect } from 'react';
import {
  topArtists, topAlbums, topSongs, topPlaylists,
} from '../list-music-user';
import AlbumsCarousel from './AlbumsCarousel';
import ArtistsCarousel from './ArtistsCarousel';
import SongsCarousel from './SongsCarousel';
import PlaylistsCarousel from './PlaylistsCarousel';

function Home() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getAllTops = (async () => {
      try {
        const artistsData = await topArtists(20);
        const albumsData = await topAlbums(20);
        const songsData = await topSongs(20);
        const playlistsData = await topPlaylists(20);
        setArtists(artistsData);
        setAlbums(albumsData);
        setSongs(songsData);
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('there was an error', error);
      }
    })();
  }, []);

  return (
    <div className="homepage">
      <SongsCarousel songs={songs} />
      <ArtistsCarousel artists={artists} />
      <AlbumsCarousel albums={albums} />
      <PlaylistsCarousel playlists={playlists} />
    </div>
  );
}

export default Home;
