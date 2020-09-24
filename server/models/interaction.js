'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
      });
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId',
      });
    }
  };
  Interaction.init({
    userId: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Interaction',
    underscored: true,
  });
  return Interaction;
};