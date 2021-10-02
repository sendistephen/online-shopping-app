const express = require('express');
const router = express.Router();

const { isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, read, update } = require('../controllers/user');
router.get('/user/:userId', isAuthenticated, read);
router.put('/user/:userId', isAuthenticated, update);
router.param('userId', getUserById);

module.exports = router;
