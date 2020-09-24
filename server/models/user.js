'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Interaction,{
        foreignKey: 'userId',
        as: 'interactions',
        onDelete: 'CASCADE'
      });
      this.belongsToMany(models.Playlist,{
        through: 'PlaylistOfUser',
        foreignKey: 'userId',
        as: 'playlists',
        onDelete: 'CASCADE'
      });
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    preferences: DataTypes.JSON,
    isAdmin: DataTypes.BOOLEAN,
    rememberToken: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};