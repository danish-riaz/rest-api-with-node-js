const { validationResult } = require('express-validator');

const Post = require('../models/post');
const { Error } = require('mongoose');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((records) => {
      res.status(200).json({
        posts: records,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed !');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/book.jpeg',
    creator: {
      name: 'Danish Riaz',
    },
  });

  post
    .save()
    .then((record) => {
      console.log(record);
      res.status(201).json({
        message: 'Post created successfully!',
        post: record,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next.err;
    });
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((record) => {
      if (!record) {
        const err = new Error('No Post Found.');
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        post: record,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
