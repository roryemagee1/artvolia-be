const express = require('express');
const { check } = require('express-validator');

const postsController = require('../controllers/posts-controller');

const router = express.Router();


router.get('/:uid', postsController.getPostsByUserId);

router.get('/:uid/:pid', postsController.getPostByUserId);

router.post(
  '/:uid/create-post', 
  [
    check('postText')
      .not()
      .isEmpty(),
    check('postText')
      .isLength({ max: 240 })
  ],
  postsController.createPost);

router.patch('/:uid/:pid', postsController.updatePostByUserId);

router.delete('/:uid/:pid', postsController.deletePostByUserId);


module.exports = router;