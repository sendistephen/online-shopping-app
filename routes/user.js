const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);

module.exports = router;
