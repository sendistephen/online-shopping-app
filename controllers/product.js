const { errorHandler } = require('../helpers/mongoError');

const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Product = require('../models/product');

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
