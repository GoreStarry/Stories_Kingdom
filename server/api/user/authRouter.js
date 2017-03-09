const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../mongodb/model/user-settings');

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

        const writebleUser = user.toObject();

        delete writebleUser['_id'];

        res.json({
          success: true,
          message: 'Login Success',
          token,
          user: writebleUser
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

            const writebleData = data.toObject();

            delete writebleData['_id'];

            res.json({
              success: true,
              message: 'Sign Up Success',
              token,
              user: writebleData
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
module.exports = authRouter;
