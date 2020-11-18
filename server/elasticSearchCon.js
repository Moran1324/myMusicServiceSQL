const { Client } = require('@elastic/elasticsearch');

const client = new Client({
	cloud: {
		id: process.env.ELASTIC_SEARCH_ID,
	},
	auth: {
		username: process.env.ELASTIC_USERNAME,
		password: process.env.ELASTIC_PASSWORD,
	},
});

const insertData = async (dataArr, tableName, singleName) => {
	const body = dataArr.flatMap((doc) => [
		{ index: { _index: tableName, _type: singleName } },
		doc,
	]);
	const { body: bulkResponse } = await client.bulk({ refresh: true, body });
	if (bulkResponse.errors) {
		return res.json(bulkResponse.errors);
	}
	const { body: count } = await client.count({ index: tableName });
	return count;
};

module.exports = { client, insertData };
