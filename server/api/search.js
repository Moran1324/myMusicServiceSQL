const { Router } = require('express');
const { client } = require('../elasticSearchCon');

const router = Router();

router.get('/', (req, res) => {
	res.send('hello world');
});

router.get('/all', async (req, res) => {
	const searchText = '';
	if (req.query.searchText) {
		searchText = req.query.searchText;
	}
	const results = await client.search({
		index: searchText,
		body: {
			query: {
				match: {},
			},
			size: 0,
		},
	});
	res.json(results);
});

module.exports = router;
