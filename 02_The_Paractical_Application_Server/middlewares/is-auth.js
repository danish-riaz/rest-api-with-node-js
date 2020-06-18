const jwt = require('jsonwebtoken');

isauth = (req, res, next) => {
  const authToken = req.get('Authorization').split(' ')[1];
  let decodedToken;
  if (!authToken) {
    const err = new Error('Unauthorized !');
    err.statusCode = 401;
    throw err;
  }

  try {
    decodedToken = jwt.verify(authToken, 'supersecretofmine');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error('Not Authonticated !');
    err.statusCode = 401;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = isauth;
