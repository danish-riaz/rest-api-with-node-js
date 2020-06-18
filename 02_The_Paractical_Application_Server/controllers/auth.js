const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error('Validation Failed');
    err.statusCode = 422;
    err.array = error.array();
    throw err;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  console.log(email, password, name);

  bcrypt
    .hash(password, 12)
    .then((hashedPaswd) => {
      const user = new User({
        email: email,
        password: hashedPaswd,
        name: name,
        posts: [],
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Singup Success !',
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
