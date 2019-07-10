const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose.connect(db)
  .then(() => {
    console.log('mongoDB connectes');
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello world"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
})