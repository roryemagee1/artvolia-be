const express = require('express');

const postsController = require('../controllers/posts-controller');

const router = express.Router();


router.get('/:uid', postsController.getUserById);

router.get('/:uid', postsController.getPostsByUserId);

router.get('/:uid/:pid', postsController.getPostByUserId);

router.patch('/:uid/:pid', postsController.updatePostByUserId);

router.delete('/:uid/:pid', postsController.deletePostByUserId);


router.post('/:uid/create-post', postsController.createPost);

module.exports = router;