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
  const errors = validationResult(req);
  const validationErrors = errors.array();
  console.log(validationErrors);

  const imageData = req.file;
  const pageName = req.pageName;

  if (!imageData) {
    return res.status(422).render('admin/edit-page', {
      pageTitle: 'Admin Edit Page',
      path: 'admin/edit-page',
      errorMessage: 'O arquivo que foi enviado não é uma imagem.',
      validationErrors: validationErrors,
    });
  }

  if (validationErrors.length > 0) {
    console.log(validationErrors);

    return res.status(422).render('admin/edit-page', {
      pageTitle: 'Admin Edit Page',
      path: 'admin/edit-page',
      errorMessage: errors.array()[0].msg,
      validationErrors: validationErrors,
    });
  }

  // res.redirect(
  //   '/admin/edit-page',

  //   {
  //     pageTitle: 'Admin Edit Page',
  //     path: 'admin/edit-page',
  //     message: `Banner da Página ${pageName} atualizado com sucesso.`,
  //   }
  // );

  // switch (req.pageName) {
  //   case 'banner-1':
  //     fs.unlink(
  //       './images/background-images/Retangulo98.png',

  //       (err) => {
  //         if (err) {
  //           console.log(err);
  //         }

  //         fs.writeFile(
  //           './images/background-images/Retangulo98.png',
  //           imageData,

  //           (err) => {
  //             if (err) {
  //               throw err;
  //             }
  //             console.log('File Saved');
  //           }
  //         );
  //       }
  //     );
  //   case 'banner-2':
  //     fs.unlink(
  //       './images/background-images/Retangulo99.png',

  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   case 'banner-3':
  //     fs.unlink(
  //       './images/background-images/Retangulo100.png',

  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   case 'banner-4':
  //     fs.unlink(
  //       './images/background-images/Retangulo101.png',

  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   default:
  // }
};
