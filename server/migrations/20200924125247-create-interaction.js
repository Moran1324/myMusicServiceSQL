'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Interactions', {
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
			artist_id: {
				type: Sequelize.INTEGER,
			},
			album_id: {
				type: Sequelize.INTEGER,
			},
			playlist_id: {
				type: Sequelize.INTEGER,
			},
			song_id: {
				type: Sequelize.INTEGER,
			},
			is_liked: {
				type: Sequelize.BOOLEAN,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Interactions');
	},
};
