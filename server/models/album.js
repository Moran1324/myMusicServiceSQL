'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Album extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Artist, {
				foreignKey: 'artistId',
				as: 'artist',
			});
			this.hasMany(models.Song, {
				foreignKey: 'albumId',
				as: 'songs',
				onDelete: 'SET NULL',
			});
			this.hasMany(models.Interaction, {
				foreignKey: 'albumId',
				as: 'interactions',
				onDelete: 'SET NULL',
			});
		}
	}
	Album.init(
		{
			name: DataTypes.STRING,
			coverImg: DataTypes.TEXT,
			artistId: DataTypes.INTEGER,
			releasedAt: DataTypes.DATE,
			deletedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Album',
			underscored: true,
		}
	);
	return Album;
};
