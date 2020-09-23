const express = require('express');
// const mysqlCon = require('./sqlConnection');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method} at ${Date(Date.now())}`);
  next();
}
app.use(logger);

app.use('/api', require('./api'));

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
    return response.status(400).send({ error: 'requested data was not found' });
  }
  if (error.field === 'ER_NO_DEFAULT_FOR_FIELD') {
    return response.status(400).send({ error: 'necessary data was not sent' });
  }

  next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

module.exports = app;
