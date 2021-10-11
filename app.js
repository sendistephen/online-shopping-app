const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const path = require('path');
require('dotenv').config();

const app = express();

// database config
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connection successfull!'));

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

// routes
app.use('/api/v1/', require('./routes/auth'));
app.use('/api/v1/', require('./routes/user'));
app.use('/api/v1/', require('./routes/category'));
app.use('/api/v1/', require('./routes/product'));
app.use('/api/v1/', require('./routes/braintree'));
app.use('/api/v1/', require('./routes/order'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './client/build/index.html'))
  );
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
