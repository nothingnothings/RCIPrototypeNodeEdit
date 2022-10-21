const fs = require('fs');
const path = require('path');

exports.getAdminPage = (req, res, _next) => {
  // const bannerPageStringArray = [];

  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken(),
  });
};
