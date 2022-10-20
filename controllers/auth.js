const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLoginPage = (req, res, _next) => {
  res.render('admin/login', {
    path: '/admin/login',
    pageTitle: 'Admin Login Page',
  });
};

exports.postLogin = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  const errors = validationResult(req);
  const validationErrors = errors.array();

  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        if (!errors.isEmpty()) {
          return res.status(422).render('/admin/login', {
            pageTitle: 'Login Page',
            path: 'admin/login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
              email: email,
              password: password,
            },

            validationErrors: validationErrors,
          });
        }
      } else {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((_err) => {
                res.redirect('/admin/edit-page');
              });
            } else {
              res.render('admin/login', {
                pageTitle: 'Login Page',
                path: 'admin/login',
                errorMessage: errors.array()[0].msg,
                oldInput: {
                  email: email,
                  password: password,
                },
                validationErrors: validationErrors,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.redirect('/admin/login');
          });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, _next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
