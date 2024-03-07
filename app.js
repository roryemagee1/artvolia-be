const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find the requested route.', 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error has occurred.'})
});

app.listen(3000);