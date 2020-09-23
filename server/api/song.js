const { Router } = require('express');
const mysqlCon = require('../sqlConnection');

const router = Router();

// get top 20 songs
router.get('/top', (req, res, next) => {
  if (req.query.limit == null) {
    res.status(400).send({ error: 'bad request' });
    return;
  }
  mysqlCon.query(
    'call get_top_songs(?)', req.query.limit,
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

// get song by id
router.get('/:id', (req, res, next) => {
  // console.log(req.query);
  if (req.query.type === 'allSongs') {
    mysqlCon.query(
      'call get_all_songs();',
      (error, results, fields) => {
        if (error) next(error);
        if (results[0].length < 1) {
          res.status(400).send({ error: 'bad request' });
          return;
        }
        res.json(results[0]);
      },
    );
    return;
  }

  mysqlCon.query(
    `call get_${req.query.type}_songs(?);`, [req.query.id],
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

// add new song to database
router.post('/', (req, res, next) => {
  mysqlCon.query(
    'INSERT INTO songs SET ?', req.body,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// update song details in database
router.put('/:id', (req, res, next) => {
  mysqlCon.query(
    'UPDATE songs SET ? WHERE id = ?', [req.body, req.params.id],
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// delete song from database
router.delete('/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM songs WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

module.exports = router;
