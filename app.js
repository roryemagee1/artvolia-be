const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./src/routes/feed-routes');
const postsRoutes = require('./src/routes/posts-routes');
const usersRoutes = require('./src/routes/users-routes');
const HttpError = require('./src/models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/feed', feedRoutes);

app.use('/api/posts', postsRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error has occurred!"})
})

app.listen(3000);

