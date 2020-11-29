const request = require('supertest');
const server = require('../server');
const songsMock = require('./mocks/songsMock');
const albumsMock = require('./mocks/albumsMock');
const artistsMock = require('./mocks/artistsMock');
const playlistsMock = require('./mocks/playlistsMock');
const { Song, Artist, Album, Playlist } = require('../models');

const SONG_URL = '/api/song';

describe('test song api', () => {
	beforeAll(async () => {
		await Song.destroy({ truncate: true, force: true });
		await Artist.bulkCreate(artistsMock);
		await Album.bulkCreate(albumsMock);
		await Playlist.bulkCreate(playlistsMock);
	});
	afterAll(async () => {
		await Artist.destroy({ truncate: true, force: true });
		await Album.destroy({ truncate: true, force: true });
		await Playlist.destroy({ truncate: true, force: true });
		await server.close();
	});
	// beforeEach(async () => {});
	afterEach(async () => {
		await Song.destroy({ truncate: true, force: true });
	});

	it('can get all songs', async (done) => {
		await Song.bulkCreate(songsMock);
		const responseOne = await request(server)
			.get(`${SONG_URL}/all`)
			.expect(200);
		expect(typeof responseOne.body).toBe(typeof []);
		expect(responseOne.body.length).toBe(songsMock.length);
		expect(responseOne.body[responseOne.body.length]).toEqual(
			songsMock[songsMock.length]
		);
		done();
	});

	it('can get top songs', async (done) => {
		await Song.bulkCreate(songsMock);
		const topLimit = 3;
		const { body } = await request(server)
			.get(`${SONG_URL}/top?limit=${topLimit}`)
			.expect(200);
		expect(typeof body).toBe(typeof []);
		expect(body.length).toBe(topLimit);
		expect(body[body.length - 1].title).toBe(songsMock[topLimit - 1].title);
		done();
	});

	// it('can get song by id with artist in mind', async (done) => {
	// 	await Song.bulkCreate(songsMock);
	// 	const typesArr = ['artist', 'album', 'playlist', 'allSongs'];
	// 	const randomSongId = Math.round(Math.random() * songsMock.length);
	// 	const { body } = await request(server)
	// 		.get(`${SONG_URL}/${randomSongId}`)
	// 		.expect(200);
	// 	expect(typeof body).toBe(typeof {});
	// 	expect(typeof body.songs).toBe(typeof []);
	// 	expect(typeof body.artist).toBe(typeof []);
	// 	expect(body.id).toBe(randomSongId);
	// 	expect(body.name).toBe(songsMock[randomSongId - 1].name);
	// 	done();
	// });

	// can post new artist

	// ------------------------------ admin tests

	// can update artist details

	// can delete artist
});
