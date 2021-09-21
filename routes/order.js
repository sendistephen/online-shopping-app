const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, addOrderToUserHistory } = require('../controllers/user');
const { create, listOrders } = require('../controllers/order.js');
const { decreaseQuantity } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  isAuthenticated,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get('/order/list/:userId', isAuthenticated, isAdmin, listOrders);
router.param('userId', getUserById);
module.exports = router;
