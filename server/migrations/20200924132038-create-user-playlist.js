'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('UserPlaylists', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			playlist_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('UserPlaylists');
	},
};
