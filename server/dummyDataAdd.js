const mysql = require('mysql');

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'moran1324',
  database: 'my_music_service',
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('SQL Connected!');
});
