const express = require('express');
const router = express.Router();

const userController = require('../Controllers/user');

router.get('/', userController.getUser);

router.post('/user', userController.postUser);


module.exports = router;