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
    // create new product
    let product = new Product(fields);
    if (files.photo) {
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
