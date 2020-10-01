'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('PlaylistSongs', [
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 1,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 2,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 6,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 8,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 17,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 23,
        "playlist_id": 1
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 34,
        "playlist_id": 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
