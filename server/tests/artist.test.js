const request = require('supertest');
const server = require('../server');
const artistsMock = require('./mocks/artistsMock');
const { Artist } = require('../models');

const ARTIST_URL = '/api/artist';

describe('test artist api', () => {
	beforeAll(async () => {
		await Artist.destroy({ truncate: true, force: true });
	});
	afterAll(async () => {
		await server.close();
	});
	// beforeEach(async () => {});
	afterEach(async () => {
		await Artist.destroy({ truncate: true, force: true });
	});

	it('can get all artists', async (done) => {
		await Artist.bulkCreate(artistsMock);
		const responseOne = await request(server)
			.get(`${ARTIST_URL}/all`)
			.expect(200);
		expect(typeof responseOne.body).toBe(typeof []);
		expect(responseOne.body.length).toBe(artistsMock.length);
		expect(responseOne.body[responseOne.body.length]).toEqual(
			artistsMock[artistsMock.length]
		);
		done();
	});

	it('can get top artists', async (done) => {
		await Artist.bulkCreate(artistsMock);
		const topLimit = 3;
		const { body } = await request(server)
			.get(`${ARTIST_URL}/top?limit=${topLimit}`)
			.expect(200);
		expect(typeof body).toBe(typeof []);
		expect(body.length).toBe(topLimit);
		expect(body[body.length - 1].artistName).toBe(
			artistsMock[topLimit - 1].artistName
		);
		done();
	});

	it('can get artist by id with chained data', async (done) => {
		await Artist.bulkCreate(artistsMock);
		const randomArtistId = Math.round(Math.random() * artistsMock.length);
		const { body } = await request(server)
			.get(`${ARTIST_URL}/${randomArtistId}`)
			.expect(200);
		expect(typeof body).toBe(typeof {});
		expect(typeof body.songs).toBe(typeof []);
		expect(typeof body.featuredSongs).toBe(typeof []);
		expect(typeof body.albums).toBe(typeof []);
		expect(body.id).toBe(randomArtistId);
		expect(body.artistName).toBe(artistsMock[randomArtistId - 1].artistName);
		done();
	});

	// can post new artist

	// ------------------------------ admin tests

	// can update artist details

	// can delete artist
});
