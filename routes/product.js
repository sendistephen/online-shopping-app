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
  list,
  getProductById,
  deleteProduct,
  updateProduct,
} = require('../controllers/product');
const { getUserById } = require('../controllers/user');

router.get('/products/:productId', read);
router.delete(
  '/products/:productId/:userId',
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.patch(
  '/products/:productId/:userId',
  isAuthenticated,
  isAdmin,
  updateProduct
);
router.get('/products', list)
router.post('/products/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);
router.param('productId', getProductById);

module.exports = router;
