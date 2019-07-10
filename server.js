const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

// DB config
const db = require('./config/keys').mongoURI;

// fixing deprecations
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);
// connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('mongoDB connectes');
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello world"));

// use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
})