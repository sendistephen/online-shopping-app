const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
} = require('../controllers/auth');
const { userSignupValidator } = require('../validators');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;
