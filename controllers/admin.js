const fs = require('fs');
const path = require('path');

exports.getAdminPage = (req, res, _next) => {
  // const bannerPageStringArray = [];

  const bannerPageStringArray = [];

  fs.readdirSync('page-text/', (err, folders) => {
    if (err) {
      console.log(err);
    }

    folders.forEach((folder) => {
      fs.readdirSync(`page-text/${folder}/`, (err, file) => {
        if (err) {
          console.log(err);
        }
        bannerPageStringArray.push(file);

        if (err) {
          console.log(err);
          throw err;
        }

        console.log(bannerPageStringArray);
      });
    });
  });


  console.log(bannerPageStringArray);
  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    bannerStringArray: bannerPageStringArray,
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken(),
  });

  // res.render('admin/edit-page', {
  //   path: '/admin/edit-page',
  //   pageTitle: 'Admin Edit Site Page',
  //   csrfToken: req.csrfToken(),
  // });
};
