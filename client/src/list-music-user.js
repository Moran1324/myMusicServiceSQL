import { user } from './api-user';

function getAll(path) {
  return user(`${path}/all`);
}

function getTops(path, limit = 200) {
  return user(`${path}/top?limit=${limit}`);
}

function topSongs(limit = 200) {
  return user(`song/top?limit=${limit}`);
}

function topArtists(limit = 200) {
  return user(`artist/top?limit=${limit}`);
}

function topAlbums(limit = 200) {
  return user(`album/top?limit=${limit}`);
}

function topPlaylists(limit = 200) {
  return user(`playlist/top?limit=${limit}`);
}

function getSongsListById (path) {
  return user(path);
}

// eslint-disable-next-line import/prefer-default-export
export {
  getTops, topSongs, topArtists, topAlbums, topPlaylists, getSongsListById, getAll,
};
