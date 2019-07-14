const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load models
const Post = require('../../models/Post.model');

// validator
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Hello from profile"}));


// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    user: req.user.id,
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
  });

  newPost.save().then(post => res.json(post));
});


// @route GET api/posts
// @desc Create post
// @access Private

module.exports = router;
