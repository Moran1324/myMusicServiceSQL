const { Router } = require('express');
const { Song, Playlist, Album, Artist } = require('../models');

const router = Router();

// SEQUELIZE ENDPOINTS

// get all playlists
router.get('/all', async (req, res, next) => {
	try {
		const playlists = await Playlist.findAll();
		res.json(playlists);
	} catch (error) {
		res.send(error.message);
	}
});

// get top playlists
router.get('/top', async (req, res, next) => {
	if (req.query.limit == null) {
		res.status(400).send({ error: 'bad request' });
		return;
	}
	const topLimit = parseInt(req.query.limit);
	try {
		const playlists = await Playlist.findAll({ limit: topLimit });
		res.json(playlists);
	} catch (error) {
		res.send(error.message);
	}
});

// get playlist songs by playlist id
router.get('/:id', async (req, res, next) => {
	try {
		const playlistData = await Playlist.findByPk(req.params.id, {
			include: [
				{
					model: Song,
					as: 'songs',
					include: ['artist', 'album'],
					exclude: 'PlaylistSongs',
				},
			],
		});
		res.json(playlistData);
	} catch (error) {
		res.send(error.message);
	}
});

// MYSQL ENDPOINTS

// // get top 20 playlists
// router.get('/top', (req, res, next) => {
//   if (req.query.limit == null) {
//     res.status(400).send({ error: 'bad request' });
//     return;
//   }
//   mysqlCon.query(
//     'call get_top_playlists(?);', req.query.limit,
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

// // get playlist by id
// router.get('/:id', (req, res, next) => {
//   mysqlCon.query(
//     'call get_playlist_songs(?);', req.params.id,
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

/*
// add new playlist to database
router.post('/', (req, res, next) => {
  mysqlCon.query(
    'INSERT INTO playlists SET ?', req.body,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// update playlist details in database
router.put('/:id', (req, res, next) => {
  mysqlCon.query(
    'UPDATE playlists SET ? WHERE playlist_id = ?', [req.body, req.params.id],
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// delete playlist from database
router.delete('/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM playlists WHERE playlist_id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});
*/

module.exports = router;
