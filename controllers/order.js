const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/mongoError');

exports.create = (req, res) => {
  // get the user associated to the order -> add info from the req.profile to order
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id,name,address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(orders);
    });
};
