'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        as: 'artist'
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'featuredArtistId',
        as: 'featuredArtist'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
        as: 'album'
      });
      this.hasMany(models.Interaction, {
        foreignKey: 'songId',
        as: 'interactions',
        onDelete: 'CASCADE'
      });
      this.belongsToMany(models.Playlist, {
        through: 'PlaylistSongs',
        foreignKey: 'songId',
        as: 'playlist',
        onDelete: 'CASCADE'
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    featuredArtistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    length: DataTypes.TIME,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Song',
    underscored: true,
  });
  return Song;
};