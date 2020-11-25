const app = require('./server');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
	console.log(`Music service listening at http://localhost:${PORT}`);
	console.log(`Environment: ${NODE_ENV}`);
});
