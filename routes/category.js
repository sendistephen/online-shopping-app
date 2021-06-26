const express = require('express');
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} = require('../controllers/auth');

const {
  create,
  read,
  getCategoryById,
  deleteCategory,
} = require('../controllers/category');
const { getUserById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.delete('/category/:categoryId/:userId', deleteCategory);
router.post('/category/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

module.exports = router;
