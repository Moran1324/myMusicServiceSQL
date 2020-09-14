require('dotenv').config();
const mysql = require('mysql');

const { USER, PASSWORD, DATABASE } = process.env;

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('SQL Connected!');
});

module.exports = mysqlCon;
