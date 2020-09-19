const express = require('express');
const mysqlCon = require('./sqlConnection');

const app = express();

app.use(express.json());
//  app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}
app.use(logger);

// get top 20 songs
app.get('/top_songs', (req, res, next) => {
  mysqlCon.query(
    'call get_top_songs(?)', req.query.limit,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get song by id
app.get('/song/:id', (req, res, next) => {
  mysqlCon.query(
    'SELECT * FROM songs WHERE id = ?;', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// add new song to database
app.post('/song', (req, res, next) => {
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
app.put('/song/:id', (req, res, next) => {
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
app.delete('/song/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM songs WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get top 20 artists
app.get('/top_artists', (req, res, next) => {
  mysqlCon.query(
    'call get_top_artists(?);', req.query.limit,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get artist by id
app.get('/artist/:id', (req, res, next) => {
  mysqlCon.query(
    'SELECT * FROM artists WHERE id = ?;', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// add new artist to database
app.post('/artist', (req, res, next) => {
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
app.put('/artist/:id', (req, res, next) => {
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
app.delete('/artist/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM artists WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get top 20 albums
app.get('/top_albums', (req, res, next) => {
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
app.get('/album/:id', (req, res, next) => {
  mysqlCon.query(
    'SELECT * FROM albums WHERE id = ?;', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// add new album to database
app.post('/album', (req, res, next) => {
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
app.put('/album/:id', (req, res, next) => {
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
app.delete('/album/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM albums WHERE id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get top 20 playlists
app.get('/top_playlists', (req, res, next) => {
  mysqlCon.query(
    'call get_top_playlists(?);', req.query.limit,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// get playlist by id
app.get('/playlist/:id', (req, res, next) => {
  mysqlCon.query(
    'SELECT * FROM playlists WHERE playlist_id = ?;', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

// add new playlist to database
app.post('/playlist', (req, res, next) => {
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
app.put('/playlist/:id', (req, res, next) => {
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
app.delete('/playlist/:id', (req, res, next) => {
  mysqlCon.query(
    'DELETE FROM playlists WHERE playlist_id = ?', req.params.id,
    (error, results, fields) => {
      if (error) next(error);
      res.json(results);
    },
  );
  // don't forget: catch((error) => next(error));
});

/// ERRORS SECTION

const unknownEndpointHandler = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpointHandler);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  // build here your error handler
  if (error.code === 'ER_BAD_FIELD_ERROR') {
    return response.status(400).send({ error: 'wrong id was inserted' });
  }
  if (error.field === 'ER_NO_DEFAULT_FOR_FIELD') {
    return response.status(400).send({ error: 'necessary data was not sent' });
  }

  next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

module.exports = app;
