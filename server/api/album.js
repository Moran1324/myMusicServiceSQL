const { Router } = require('express');
const mysqlCon = require('../sqlConnection');

const router = Router();

// get top 20 albums
router.get('/top', (req, res, next) => {
  if (req.query.limit == null) {
    res.status(400).send({ error: 'bad request' });
    return;
  }
  mysqlCon.query(
    'call get_top_albums(?);', req.query.limit,
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

// get album by id
router.get('/:id', (req, res, next) => {
  mysqlCon.query(
    'call get_album_songs(?);', req.params.id,
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

// add new album to database
router.post('/', (req, res, next) => {
  mysqlCon.query(
    'INSERT INTO albums SET ?', req.body,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// update album details in database
router.put('/:id', (req, res, next) => {
  mysqlCon.query(
    'UPDATE albums SET ? WHERE id = ?', [req.body, req.params.id],
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// delete album from database
router.delete('/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM albums WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

module.exports = router;
