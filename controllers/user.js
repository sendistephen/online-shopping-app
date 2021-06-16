const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const User = require('../models/user');
const { errorHandler } = require('../helpers/mongoError');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json({ user });
  });
};

// signin
exports.signin = (req, res) => {
  // find user based on email
  const { email, password } = req.body;
  // find the user
  User.findOne({ email }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(400).json({
        SyntaxError: 'User with that email does not exit. Please sign up!',
      });
    }
    /**
     * user now found
     * ensure user email and password actually match
     * check if user is authenticated
     * generate a signed token
     */
    if (!foundUser.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match' });
    }
    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = foundUser;
    return res.json({ token, foundUser: { _id, name, email, role } });
  });
};
