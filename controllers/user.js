const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, foundUser) => {
    if (err || !foundUser) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    // user is found
    req.profile = foundUser;
    next();
  });
};


