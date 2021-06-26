const { errorHandler } = require('../helpers/mongoError');

const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Product = require('../models/product');

exports.getProductById = (req, res, next, productId) => {
  Product.findById(productId).exec((err, foundProduct) => {
    if (err || !foundProduct) {
      return res.status(400).json({ error: 'Product not found' });
    }
    // store product in req object
    req.product = foundProduct;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status({ error: errorHandler });
    }
    return res.json({
      message: 'Product deleted successfully!',
      deletedProduct,
    });
  });
};

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }
    // check for all form fields
    const { name, description, price, category, quantity, shipping } = fields;
    if ((!name || !description || !price, !category, !quantity, !shipping)) {
      return res.json({ error: 'All fields are required!' });
    }
    // create new product
    let product = new Product(fields);
    if (files.photo) {
      // limit photo size
      if (files.photo.size > 1000000) {
        return res.json({
          error: 'Image size should be less than 1mb in size',
        });
      }
      // access file system
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        res.status({ error: errorHandler });
      }
      return res.json({ result });
    });
  });
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }

    // update product
    let product = req.product;
    product.set(fields);

    if (files.photo) {
      // limit photo size
      if (files.photo.size > 1000000) {
        return res.json({
          error: 'Image size should be less than 1mb in size',
        });
      }
      // access file system
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        res.status({ error: errorHandler });
      }
      return res.json({ result });
    });
  });
};
