const { Router } = require('express');
const mysqlCon = require('../sqlConnection');

const router = Router();

// get top 20 playlists
router.get('/top', (req, res, next) => {
  if (req.query.limit == null) {
    res.status(400).send({ error: 'bad request' });
    return;
  }
  mysqlCon.query(
    'call get_top_playlists(?);', req.query.limit,
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

// get playlist by id
router.get('/:id', (req, res, next) => {
  mysqlCon.query(
    'call get_playlist_songs(?);', req.params.id,
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

module.exports = router;
