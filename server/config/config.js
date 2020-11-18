require('dotenv').config();

const {
	USER,
	PASSWORD,
	DEV_DATABASE,
	TEST_DATABASE,
	ONLINE_USER,
	ONLINE_PASSWORD,
	ONLINE_HOSTNAME,
	ONLINE_DATABASE,
} = process.env;

module.exports = {
	development: {
		username: ONLINE_USER,
		password: ONLINE_PASSWORD,
		database: ONLINE_DATABASE,
		host: ONLINE_HOSTNAME,
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
		host: '127.0.0.1',
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
