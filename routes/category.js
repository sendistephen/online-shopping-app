const express = require('express');
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} = require('../controllers/auth');

const { create, read, getCategoryById } = require('../controllers/category');
const { getUserById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

module.exports = router;
