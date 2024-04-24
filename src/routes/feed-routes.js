const express = require('express');

const feedController = require('../controllers/feed-controller');

const router = express.Router();


router.get('/', feedController.getAllFeed);


module.exports = router;