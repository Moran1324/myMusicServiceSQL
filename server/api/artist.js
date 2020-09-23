const { Router } = require('express');
const mysqlCon = require('../sqlConnection');

const router = Router();

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
