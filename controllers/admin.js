exports.getAdminPage = (req, res, _next) => {

  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken()
  });
};
