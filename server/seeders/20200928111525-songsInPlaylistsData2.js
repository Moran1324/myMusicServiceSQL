'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('PlaylistSongs', [
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 12,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 13,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 18,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 25,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 38,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 48,
        "playlist_id": 2
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "song_id": 49,
        "playlist_id": 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
