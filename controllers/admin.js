
const { validationResult } = require('express-validator');

exports.getAdminPage = (req, res, _next) => {


  console.log(req.csrfToken());
  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken()
  });
};
