const { errorHandler } = require('../helpers/mongoError');

const formidable = require('formidable');
const fs = require('fs');

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
      return res.status(400).json({ error: errorHandler });
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
      return res.status(400).json({ error: 'All fields are required!' });
    }
    // create new product
    let product = new Product(fields);
    if (files.photo) {
      // limit photo size
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image size should be less than 1mb in size',
        });
      }
      // access file system
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler });
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
        return res.status(400).json({
          error: 'Image size should be less than 1mb in size',
        });
      }
      // access file system
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler });
      }
      return res.json({ result });
    });
  });
};

/**
 * Sell || Arrival of products
 * return product by sell: /products?sortBy=sold&order=desc&limit=6
 * return products by arrival: /products?sortBy=createdAt&order=desc&limit=6
 * return all products if no params sent
 */
exports.list = (req, res) => {
  const order = req.query.order ? req.query.order : 'asc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, foundProducts) => {
      if (err) {
        return res.status(400).json({ error: 'Products not found' });
      }
      return res.json(foundProducts);
    });
};

/**
 *This method will find products based on req product category
 *Products that have the same category will be returned
 *
 */
exports.listRelated = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  // find all the products excluding itself
  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: 'Products not found' });
      }
      return res.json(products);
    });
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns all the categories based on products
 */
exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    console.log('categories')
    // if (err) {
    //   return res.status(400).json({ error: 'Categories not found' });
    // }
    return res.json(categories);
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};
