const { validationResult } = require('express-validator');

exports.getAdminPage = (req, res, _next) => {
  res.render('admin/edit-site', {
    path: '/admin/edit-site',
    pageTitle: 'Admin Edit Site Page',
  });
};
