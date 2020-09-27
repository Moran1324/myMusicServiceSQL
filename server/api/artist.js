const { Router } = require('express');
const { Op } = require('sequelize');
const mysqlCon = require('../sqlConnection');
const { Artist, Song } = require('../models');

const router = Router();

router.get('/test/:id', async (req, res, next) => {
  try {
    const artistSongs = await Song.findAll({
      where: {
        [Op.or]: [
          { artistId: req.params.id },
          { featuredArtistId: req.params.id },
        ],
      },
      include: ['artist', 'album', 'featuredArtist'],
    });
    res.json(artistSongs);
  } catch (error) {
    res.send(error.message);
  }
});

// SEQUELIZE ENDPOINTS

/*

// get all artists
router.get('/all', async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.send(error.message);
  }
});

// get top artists
router.get('/top', async (req, res, next) => {
  if (req.query.limit == null) {
    res.status(400).send({ error: 'bad request' });
    return;
  }
  const topLimit = parseInt(req.query.limit);
  try {
    const artists = await Artist.findAll({ limit: topLimit });
    console.log(artists);
    res.json(artists);
  } catch (error) {
    res.send(error.message);
  }
});

*/

// MYSQL ENDPOINTS

// get top 20 artists
router.get('/top', (req, res, next) => {
  if (req.query.limit == null) {
    res.status(400).send({ error: 'bad request' });
    return;
  }
  mysqlCon.query(
    'call get_top_artists(?);', req.query.limit,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.json(results[0]);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get artist by id
router.get('/:id', (req, res, next) => {
  mysqlCon.query(
    'call get_artist_songs(?);', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      if (results[0].length < 1) {
        res.status(400).send({ error: 'bad request' });
        return;
      }
      res.json(results[0]);
    },
  );
  // don't forget: catch((error) => next(error));
});

// add new artist to database
router.post('/', (req, res, next) => {
  mysqlCon.query(
    'INSERT INTO artists SET ?', req.body,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// update artist details in database
router.put('/:id', (req, res, next) => {
  mysqlCon.query(
    'UPDATE artists SET ? WHERE id = ?', [req.body, req.params.id],
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// delete artist from database
router.delete('/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM artists WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

module.exports = router;
