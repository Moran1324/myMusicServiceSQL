const request = require('supertest');
const server = require('../server');
const playlistsMock = require('./mocks/playlistsMock');
const { Playlist } = require('../models');

const PLAYLIST_URL = '/api/playlist';

describe('test playlist api', () => {
	beforeAll(async () => {
		await Playlist.destroy({
			truncate: true,
			force: true,
		});
	});
	afterAll(async () => {
		await server.close();
	});
	// beforeEach(async () => {});
	afterEach(async () => {
		await Playlist.destroy({
			truncate: true,
			force: true,
		});
	});

	it('can get all playlists', async (done) => {
		await Playlist.bulkCreate(playlistsMock);
		const response = await request(server)
			.get(`${PLAYLIST_URL}/all`)
			.expect(200);
		expect(typeof response.body).toBe(typeof []);
		expect(response.body.length).toBe(playlistsMock.length);
		expect(response.body[response.body.length]).toEqual(
			playlistsMock[playlistsMock.length]
		);
		done();
	});

	it('can get top playlists', async (done) => {
		await Playlist.bulkCreate(playlistsMock);
		const topLimit = 3;
		const { body } = await request(server)
			.get(`${PLAYLIST_URL}/top?limit=${topLimit}`)
			.expect(200);
		expect(typeof body).toBe(typeof []);
		expect(body.length).toBe(topLimit);
		expect(body[body.length - 1].name).toBe(playlistsMock[topLimit - 1].name);
		done();
	});

	it('can get playlist by id with chained data', async (done) => {
		await Playlist.bulkCreate(playlistsMock);
		const randomPlaylistId = Math.round(Math.random() * playlistsMock.length);
		const { body } = await request(server)
			.get(`${PLAYLIST_URL}/${randomPlaylistId}`)
			.expect(200);
		expect(typeof body).toBe(typeof {});
		expect(typeof body.songs).toBe(typeof []);
		expect(body.id).toBe(randomPlaylistId);
		expect(body.name).toBe(playlistsMock[randomPlaylistId - 1].name);
		done();
	});

	// can post new artist

	// ------------------------------ admin tests

	// can update artist details

	// can delete artist
});
