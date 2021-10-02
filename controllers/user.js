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

// get user info
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// update user profile
exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({ error: 'Opps! Not authorized!' });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (err, data) => {
      if (error) {
        return res
          .status(400)
          .json({ error: 'Could not update user purchase history' });
      }
      next();
    }
  );
};
