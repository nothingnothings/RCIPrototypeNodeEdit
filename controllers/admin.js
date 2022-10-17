const fs = require('fs');
const path = require('path');


const { validationResult } = require('express-validator');

exports.getAdminPage = (req, res, _next) => {
  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    pageTitle: 'Admin Edit Site Page',
  });
};

exports.bannerPost = (req, res, next) => {



}