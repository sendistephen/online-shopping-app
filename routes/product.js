const express = require('express');
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} = require('../controllers/auth');

const { create } = require('../controllers/product');
const { getUserById } = require('../controllers/user');

router.post('/product/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);

module.exports = router;
