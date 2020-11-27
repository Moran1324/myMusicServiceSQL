const app = require('./server');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MY_URL = process.env.MY_URL || 'http://localhost';

app.listen(PORT, () => {
	console.log(`Music service listening at ${MY_URL}:${PORT}`);
	console.log(`Environment: ${NODE_ENV}`);
});
