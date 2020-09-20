import { user } from './api-user';

function topSongs(limit = 200) {
  return user(`top_songs?limit=${limit}`);
}

function topArtists(limit = 200) {
  return user(`top_artists?limit=${limit}`);
}

function topAlbums(limit = 200) {
  return user(`top_albums?limit=${limit}`);
}

function topPlaylists(limit = 200) {
  return user(`top_playlists?limit=${limit}`);
}

function getSongsListById (path) {
  return user(`${path}`);
}

// eslint-disable-next-line import/prefer-default-export
export {
  topSongs, topArtists, topAlbums, topPlaylists, getSongsListById,
};
