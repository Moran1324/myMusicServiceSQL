require('dotenv').config();
const mysql = require('mysql');

const { USER, PASSWORD, DATABASE: DEV_DATABASE } = process.env;

const mysqlCon = mysql.createConnection({
	host: 'localhost',
	user: USER,
	password: PASSWORD,
	database: DEV_DATABASE,
	multipleStatements: true,
});

mysqlCon.connect((err) => {
	if (err) throw err;
	console.log('SQL Connected!');
});

module.exports = mysqlCon;
