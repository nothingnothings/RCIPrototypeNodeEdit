const fs = require('fs');
const path = require('path');

exports.getAdminPage = (req, res, _next) => {


  const bannerPageStringArray = [];

  const folderNames = fs.readdirSync('page-text/');



  folderNames.forEach(
    (folder) => {
   const fileName = fs.readdirSync(`page-text/${folder}/`);
   const fileContent = fs.readFileSync(`page-text/${folder}/${fileName}`, 'utf-8');
   bannerPageStringArray.push(fileContent);
    }
  )


  console.log(bannerPageStringArray);




  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    bannerStringArray: bannerPageStringArray,
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken(),
  });




    // fs.readdir('page-text/', function (err, folderNames) {


    // console.log('EXAMPLE', folderNames, 'LINE');




    //   if (err) {
    //     console.log(err);
    //   }
  
    //   folderNames.forEach((folder) => {
    //     fs.readdir(`page-text/${folder}/`, (err, fileName) => {
    //       if (err) {
    //         console.log(err);
    //       }
  
    //   const fileContent = fs.readFileSync(
    //         `page-text/${folder}/${fileName}`,
    //         'utf-8',
    //       );
  
    //       bannerPageStringArray.push(fileContent);
    //       console.log(bannerPageStringArray, 'RETRY');
  
    //       if (err) {
    //         console.log(err);
    //         throw err;
    //       }
  
    //     });
    //   })

  
      // console.log(bannerPageStringArray, 'LINEEND');

    // res.render('admin/edit-page', {
    //   path: '/admin/edit-page',
    //   bannerStringArray: bannerPageStringArray,
    //   pageTitle: 'Admin Edit Site Page',
    //   csrfToken: req.csrfToken(),
    // });
  // });




  // console.log('TESTING', 2);



  // res.render('admin/edit-page', {
  //   path: '/admin/edit-page',
  //   bannerStringArray: bannerPageStringArray,
  //   pageTitle: 'Admin Edit Site Page',
  //   csrfToken: req.csrfToken(),
  // });

  // res.render('admin/edit-page', {
  //   path: '/admin/edit-page',
  //   pageTitle: 'Admin Edit Site Page',
  //   csrfToken: req.csrfToken(),
  // });
};
