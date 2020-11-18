const request = require('supertest');
const server = require('../server');
const mysqlCon = require('../sqlConnection');

describe('test artist', () => {
	// beforeAll(async () => {});
	afterAll(async () => {
		await server.close();
		await mysqlCon.close();
	});
	// beforeEach(async () => {});
	// afterEach(async () => {});
	it('can get all artists', async () => {
		const response = await request(server).get('/api/artist/all');
		expect(response.status).toBe(200);
		expect(typeof response).toBe(typeof []);
		expect(response.body.length).toBe(0);
		console.log(response);
	});
});
