'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId'
      });
    }
  };
  PlaylistSong.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PlaylistSong',
    underscored: true,
  });
  return PlaylistSong;
};