const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../mongodb/model/user-settings');

authRouter.get('/', (req, res) => {
  res.json({
    val: 'successs'
  });
})

authRouter.post('/', (req, res) => {
  const {name} = req.body;
  User.findOne({
    name
  })
    .then((user) => {
      if (user) {
        const id = user._id;

        const token = jwt.sign({
          id
        }, res.app.get('jwt_hash_key'), {
          expiresIn: '30d'
        })

        res.json({
          success: true,
          message: 'Login Success',
          token
        })

      } else { //create user
        const newUser = new User({
          name
        })
        newUser
          .save()
          .then((data) => {

            const id = data._id;

            const token = jwt.sign({
              id
            }, res.app.get('jwt_hash_key'), {
              expiresIn: '30d'
            })

            res.json({
              success: true,
              message: 'Sign Up Success',
              token
            })
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .send(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

module.exports = authRouter;
