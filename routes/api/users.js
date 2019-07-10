const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User.model');

// @route GET api/users/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: "Hello from user"
}));


// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm' // default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});


// @route POST api/users/login
// @desc User Login  -  Returning JWT token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({
      email
    })
    .then(user => {
      // check for user
      if (!user) {
        return res.status(400).json({
          email: "User not found"
        });
      }
      // check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // user matched

            // create JWT payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            // signin token
            jwt.sign(
              payload,
              keys.secretOrKey, {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  succes: true,
                  token: "Bearer " + token
                })
              }
            );
          } else {
            return res.status(200).json({
              password: "Password incorrect"
            });
          }
        })
    })
})


module.exports = router;