require('dotenv').config();

const { USER, PASSWORD, DEV_DATABASE, TEST_DATABASE, MY_URL } = process.env;

module.exports = {
	development: {
		username: USER,
		password: PASSWORD,
		database: DEV_DATABASE,
		host: MY_URL,
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
		host: MY_URL,
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
		host: MY_URL,
		dialect: 'mysql',
	},
};
