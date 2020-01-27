'use strict';
const router = require('express').Router();
const users = require('./users/user.router');

// ::different routes based on the category of APIs
router.use('/users', users.public);

module.exports = router;
