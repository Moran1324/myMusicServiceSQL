require('dotenv').config();

const { USER, PASSWORD, DEV_DATABASE, TEST_DATABASE } = process.env;

module.exports = {
	development: {
		username: USER,
		password: PASSWORD,
		database: DEV_DATABASE,
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			underscored: true,
			paranoid: true,
		},
	},
	test: {
		username: USER,
		password: PASSWORD,
		database: TEST_DATABASE,
		host: '127.0.0.1', // make env variable for docker
		dialect: 'mysql',
		define: {
			underscored: true,
			paranoid: true,
		},
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};
