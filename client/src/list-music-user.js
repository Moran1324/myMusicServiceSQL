import { user } from './api-user';

function topSongs(limit = 20) {
  return user(`top_songs?limit=${limit}`);
}

function topArtists(limit = 20) {
  return user(`top_artists?limit=${limit}`);
}

function topAlbums(limit = 20) {
  return user(`top_albums?limit=${limit}`);
}

function topPlaylists(limit = 20) {
  return user(`top_playlists?limit=${limit}`);
}

// eslint-disable-next-line import/prefer-default-export
export {
  topSongs, topArtists, topAlbums, topPlaylists,
};
