require('dotenv').config();
const app = require('./server');

const MY_URL = process.env.MY_URL || 'http://localhost:';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
	console.log(`Music service listening at ${MY_URL}${PORT}`)
);
