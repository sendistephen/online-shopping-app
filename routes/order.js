const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../controllers/auth');
const { getUserById, addOrderToUserHistory } = require('../controllers/user');
const { create } = require('../controllers/order.js');
const { decreaseQuantity } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  isAuthenticated,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.param('userId', getUserById);
module.exports = router;
