const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const bcrypt = require('bcryptjs');

const authController = require('../controllers/auth');
const User = require('../models/user');

router.get('/login', authController.getLoginPage);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { _req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject(
              'Nenhum Admin encontrado para este email, por favor tente outro.'
            );
          }
        });
      })
      .normalizeEmail(),
    check('password')
      .custom((value, { req }) => {
        return User.findOne({ email: req.body.email }).then((user) => {
          return bcrypt
            .compare(user.password.toString(), value.toString())
            .then((result) => {
              if (result) {
                return value;
              } else {
                if (value.length < 6) {
                  return Promise.reject(
                    'A senha deve conter 6 ou mais caracteres.'
                  );
                } else {
                  return Promise.reject('Senha inválida.');
                }
              }
            });
        });
      })
      .trim(),
  ],

  authController.postLogin
);

router.post(
  '/signup',
  authController.postSignup
);

router.post('/logout', authController.postLogout);

// router.get(
//   '/signup',
// authController.getSignupPage
// );

module.exports = router;
