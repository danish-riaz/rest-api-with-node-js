const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let lodeduser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error('No user found with this email.');
        err.statusCode = 401;
        throw err;
      }
      lodeduser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((doesMatch) => {
      if (!doesMatch) {
        const err = new Error('Invalid Password');
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        {
          email: lodeduser.email,
          userId: lodeduser._id.toString(),
        },
        'supersecretofmine',
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        token: token,
        userId: lodeduser._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
