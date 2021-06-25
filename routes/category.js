const express = require('express');
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} = require('../controllers/auth');

const { create } = require('../controllers/category');
const { getUserById } = require('../controllers/user');

router.post('/category/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);

module.exports = router;
