'use strict';
const router = require('express').Router();
const users = require('./users/user.router');
const transactions = require('./users/transaction.router');

// ::different routes based on the category of APIs
router.use('/users', users.protected);
router.use('/transactions', transactions);

module.exports = router;
