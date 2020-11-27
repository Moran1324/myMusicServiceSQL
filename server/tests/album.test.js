const request = require('supertest');
const server = require('../server');
const albumsMock = require('./mocks/albumsMock');
const { Album } = require('../models');

const ALBUM_URL = '/api/album';

describe('test artist api', () => {
	beforeAll(async () => {
		await Album.destroy({ truncate: true, force: true });
	});
	afterAll(async () => {
		await server.close();
	});
	// beforeEach(async () => {});
	afterEach(async () => {
		await Album.destroy({ truncate: true, force: true });
	});

	it('can get all albums', async (done) => {
		await Album.bulkCreate(albumsMock);
		const responseOne = await request(server)
			.get(`${ALBUM_URL}/all`)
			.expect(200);
		expect(typeof responseOne.body).toBe(typeof []);
		expect(responseOne.body.length).toBe(albumsMock.length);
		expect(responseOne.body[responseOne.body.length]).toEqual(
			albumsMock[albumsMock.length]
		);
		done();
	});

	it('can get top albums', async (done) => {
		await Album.bulkCreate(albumsMock);
		const topLimit = 3;
		const { body } = await request(server)
			.get(`${ALBUM_URL}/top?limit=${topLimit}`)
			.expect(200);
		expect(typeof body).toBe(typeof []);
		expect(body.length).toBe(topLimit);
		expect(body[body.length - 1].name).toBe(albumsMock[topLimit - 1].name);
		done();
	});

	it('can get album by id with chained data', async (done) => {
		await Album.bulkCreate(albumsMock);
		const randomAlbumId = Math.round(Math.random() * albumsMock.length);
		const { body } = await request(server)
			.get(`${ALBUM_URL}/${randomAlbumId}`)
			.expect(200);
		expect(typeof body).toBe(typeof {});
		expect(typeof body.songs).toBe(typeof []);
		expect(typeof body.artist).toBe(typeof []);
		expect(body.id).toBe(randomAlbumId);
		expect(body.name).toBe(albumsMock[randomAlbumId - 1].name);
		done();
	});

	// can post new artist

	// ------------------------------ admin tests

	// can update artist details

	// can delete artist
});
