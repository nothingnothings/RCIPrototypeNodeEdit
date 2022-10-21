const fs = require('fs');
const path = require('path');

exports.getAdminPage = (req, res, _next) => {
  // const bannerPageStringArray = [];

  const bannerPageStringArray = [];

  fs.readdir('page-text/', (err, folders) => {
    folders.forEach((folder) => {
      fs.readdir(`page-text/${folder}/`, (err, file) => {
        if (err) {
          console.log(err);
        }
        bannerPageStringArray.push(file);


      });
    });

    if (err) {
      console.log(err);
      throw err;
    }

    res.render('admin/edit-page', {
      path: '/admin/edit-page',
      bannerStringArray: bannerPageStringArray,
      pageTitle: 'Admin Edit Site Page',
      csrfToken: req.csrfToken(),
    });
  
  });

  // res.render('admin/edit-page', {
  //   path: '/admin/edit-page',
  //   pageTitle: 'Admin Edit Site Page',
  //   csrfToken: req.csrfToken(),
  // });
};
