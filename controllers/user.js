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
