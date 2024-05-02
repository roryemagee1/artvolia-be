const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error has occurred!"})
})

mongoose
  .connect(`mongodb+srv://rawksox:kwGFVA3eBOULeZ36@cluster0.u4cn5md.mongodb.net/artvolia?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(3000);
    console.log("Connected to MongoDB!");
  })
  .catch(error => {
    console.log(error);
  });

