'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Playlist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.Song, {
				through: 'PlaylistSongs',
				foreignKey: 'playlistId',
				as: 'songs',
				onDelete: 'SET NULL',
			});
			this.hasMany(models.Interaction, {
				foreignKey: 'playlistId',
				as: 'interactions',
				onDelete: 'SET NULL',
			});
			this.belongsToMany(models.User, {
				through: 'PlaylistOfUser',
				foreignKey: 'playlistId',
				as: 'users',
				onDelete: 'CASCADE',
			});
		}
	}
	Playlist.init(
		{
			name: DataTypes.STRING,
			coverImg: DataTypes.TEXT,
			deletedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Playlist',
			underscored: true,
		}
	);
	return Playlist;
};
