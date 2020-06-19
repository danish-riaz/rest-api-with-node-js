const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isauth = require('../middlewares/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isauth, feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isauth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get('/post/:postId', isauth, feedController.getPost);

router.put(
  '/post/:postId',
  isauth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isauth, feedController.deletePost);

router.get('/status', isauth, feedController.status);

module.exports = router;
