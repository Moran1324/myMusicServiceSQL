const { Router } = require('express');
const { Op } = require('sequelize');
const mysqlCon = require('../sqlConnection');
const { Song, Playlist } = require('../models');

const router = Router();

// SEQUELIZE ENDPOINTS

// test
router.get('/test', (req, res, next) => {
	mysqlCon.query(
		`
    SELECT songs.id AS song_id, title, songs.artist_id, artists.artist_name, a.artist_name AS featuerd_artist, songs.featured_artist_id, album_name, albums.id AS album_id, length, youtube_link, albums.cover_img AS album_img, albums.created_at AS album_year, artists.cover_img AS artist_img
    FROM songs
    LEFT JOIN artists
    ON artists.id = songs.artist_id
    LEFT JOIN albums
    ON albums.id = songs.album_id
    LEFT JOIN artists a
    ON a.id = songs.featured_artist_id
    WHERE songs.album_id = ?;    `,
		+req.query.id,
		(error, results, fields) => {
			if (error) {
				res.send(error.message);
				throw error;
			}
			res.json(results);
		}
	);
	// don't forget: catch((error) => next(error));
});

// get all songs
router.get('/all', async (req, res, next) => {
	try {
		const songs = await Song.findAll({
			include: ['artist', 'album', 'featuredArtist'],
		});
		res.json(songs);
	} catch (error) {
		res.send(error.message);
	}
});

// get top songs
router.get('/top', async (req, res, next) => {
	if (req.query.limit == null) {
		res.status(400).send({ error: 'bad request' });
		return;
	}
	const topLimit = parseInt(req.query.limit);
	try {
		const topSongs = await Song.findAll({
			limit: topLimit,
			include: ['artist', 'album', 'featuredArtist'],
		});
		res.json(topSongs);
	} catch (error) {
		res.send(error.message);
	}
});

// get songs list by type and id
router.get('/:id', async (req, res, next) => {
	if (req.query.type == null) {
		res.status(400).send({ error: 'bad request' });
		return;
	}
	if (req.query.type === 'allSongs') {
		try {
			const songs = await Song.findAll({
				include: ['artist', 'album', 'featuredArtist'],
			});
			res.json(songs);
		} catch (error) {
			res.send(error.message);
		}
		return;
	}

	// songs list by artist
	if (req.query.type === 'artist') {
		try {
			const artistSongs = await Song.findAll({
				where: {
					[Op.or]: [
						{ artistId: req.query.id },
						{ featuredArtistId: req.query.id },
					],
				},
				include: ['artist', 'album', 'featuredArtist'],
			});
			res.json(artistSongs);
		} catch (error) {
			res.send(error.message);
		}
	}

	// songs list by album
	if (req.query.type === 'album') {
		try {
			const albumSongs = await Song.findAll({
				where: { albumId: req.query.id },
				include: ['album', 'artist', 'featuredArtist'],
			});
			res.json(albumSongs);
		} catch (error) {
			res.send(error.message);
		}
	}

	// songs list by playlist
	if (req.query.type === 'playlist') {
		try {
			const playlistSongs = await Song.findAll({
				// where: { id: req.params.id },
				include: [
					'artist',
					'album',
					'featuredArtist',
					{
						model: Playlist,
						as: 'playlist',
						where: { id: req.query.id },
					},
				],
			});
			res.json(playlistSongs);
		} catch (error) {
			res.send(error.message);
		}
	}
});

// MYSQL ENDPOINTS

// // get top 20 songs
// router.get('/top', (req, res, next) => {
//   if (req.query.limit == null) {
//     res.status(400).send({ error: 'bad request' });
//     return;
//   }
//   mysqlCon.query(
//     'call get_top_songs(?)', req.query.limit,
//     (error, results, fields) => {
//       if (error) {
//         res.send(error.message);
//         throw error;
//       }
//       res.json(results[0]);
//     },
//   );
//   // don't forget: catch((error) => next(error));
// });

// // get song by id
// router.get('/:id', (req, res, next) => {
//   if (req.query.type == null) {
//     res.status(400).send({ error: 'bad request' });
//     return;
//   }
//   if (req.query.type === 'allSongs') {
//     mysqlCon.query(
//       'call get_all_songs();',
//       (error, results, fields) => {
//         if (error) next(error);
//         if (results[0].length < 1) {
//           res.status(400).send({ error: 'bad request' });
//           return;
//         }
//         res.json(results[0]);
//       },
//     );
//     return;
//   }

//   mysqlCon.query(
//     `call get_${req.query.type}_songs(?);`, [req.query.id],
//     (error, results, fields) => {
//       if (error) next(error);
//       if (results[0].length < 1) {
//         res.status(400).send({ error: 'bad request' });
//         return;
//       }
//       res.json(results[0]);
//     },
//   );
//   // don't forget: catch((error) => next(error));
// });

// add new song to database
router.post('/', (req, res, next) => {
	mysqlCon.query(
		'INSERT INTO songs SET ?',
		req.body,
		(error, results, fields) => {
			if (error) next(error);
			res.json(results);
		}
	);
	// don't forget: catch((error) => next(error));
});

// update song details in database
router.put('/:id', (req, res, next) => {
	mysqlCon.query(
		'UPDATE songs SET ? WHERE id = ?',
		[req.body, req.params.id],
		(error, results, fields) => {
			if (error) next(error);
			res.json(results);
		}
	);
	// don't forget: catch((error) => next(error));
});

// delete song from database
router.delete('/:id', (req, res, next) => {
	mysqlCon.query(
		'DELETE FROM songs WHERE id = ?',
		req.params.id,
		(error, results, fields) => {
			if (error) next(error);
			res.json(results);
		}
	);
	// don't forget: catch((error) => next(error));
});

module.exports = router;
