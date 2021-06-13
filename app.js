const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// database config
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connection successfull!'));

// home route
app.get('/', (req, res) => {
  res.send('Welcome to Online Shopping App');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
