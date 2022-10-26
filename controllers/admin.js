const fs = require('fs');
const path = require('path');

exports.getAdminPage = (req, res, _next) => {
  const bannerPageStringArray = [];

  const folderNames = fs.readdirSync('page-text/');

  folderNames.forEach((folder) => {
    const fileName = fs.readdirSync(`page-text/${folder}/`);
    const fileContent = fs.readFileSync(
      `page-text/${folder}/${fileName}`,
      'utf-8'
    );
    bannerPageStringArray.push(fileContent);
  });

  console.log(bannerPageStringArray);
  console.log(req.csrfToken());

  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    bannerStringArray: bannerPageStringArray,
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken(),
  });
};

exports.postBannerText = (req, res, next) => {
  console.log('TEST');
  console.log(req.body);
  const bannerTextNumber = req.body.banner-text-number;
  console.log(bannerTextNumber);
  // const bannerText = 'dummy';



  // res.send('data');
};
