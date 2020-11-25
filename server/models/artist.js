'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Artist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Album, {
				foreignKey: 'artistId',
				as: 'albums',
				onDelete: 'CASCASE',
			});
			this.hasMany(models.Song, {
				foreignKey: 'artistId',
				as: 'songs',
				onDelete: 'CASCADE',
			});
			this.hasMany(models.Song, {
				foreignKey: 'featuredArtistId',
				as: 'featuredSongs',
				onDelete: 'CASCADE',
			});
			this.belongsToMany(models.Interaction, {
				through: 'ArtistInteraction',
				foreignKey: 'artistId',
				as: 'interactions',
			});
		}
	}
	Artist.init(
		{
			artistName: DataTypes.STRING,
			coverImg: DataTypes.TEXT,
			deletedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Artist',
			underscored: true,
		}
	);
	return Artist;
};
