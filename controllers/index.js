const fs = require('fs');
const path = require('path');

exports.getStartingPage = (req, res, _next) => {
  // try-catch

  const bannerTextFileContent = fs.readFileSync(
    `page-text/page-1/banner-text/banner-text.txt`,
    'utf-8'
  );

  const infoSectionTextFileContent = fs.readFileSync(
    'page-text/page-1/info/info.txt',
    'utf-8'
  );

  return res.render('index/index', {
    path: '/',
    bannerText: bannerTextFileContent,
    infoText: infoSectionTextFileContent,
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0],
  });

  // fs.readFile(
  //   path.join('page-text' + '/page-1' + '/banner-text' + '/banner-text.txt'),
  //   (err, data) => {
  //     if (err) {
  //       throw err;
  //     }

  //     return res.render('index/index', {
  //       path: '/',
  //       bannerText: data,
  //       message: req.flash('message')[0],
  //       errorMessage: req.flash('errorMessage')[0],
  //     });
  //   }
  // );
};

exports.getQuemSomosPage = (req, res, next) => {
  fs.readFile(
    path.join('page-text' + '/page-2' + '/banner-text' + '/banner-text.txt'),
    (err, data) => {
      if (err) {
        throw err;
      }

      res.render('index/quem-somos', {
        path: '/quem-somos',
        bannerText: data,
        message: req.flash('message')[0],
        errorMessage: req.flash('errorMessage')[0],
      });
    }
  );
};

exports.getOQueFazemosPage = (req, res, next) => {
  fs.readFile(
    path.join('page-text' + '/page-3' + '/banner-text' + '/banner-text.txt'),
    (err, data) => {
      if (err) {
        throw err;
      }

      res.render('index/o-que-fazemos', {
        path: '/o-que-fazemos',
        bannerText: data,
        message: req.flash('message')[0],
        errorMessage: req.flash('errorMessage')[0],
      });
    }
  );
};

exports.getRCInsightsPage = (req, res, next) => {
  fs.readFile(
    path.join('page-text' + '/page-4' + '/banner-text' + '/banner-text.txt'),
    (err, data) => {
      if (err) {
        throw err;
      }

      res.render('index/RCInsights', {
        path: '/RCInsights',
        bannerText: data,
        message: req.flash('message')[0],
        errorMessage: req.flash('errorMessage')[0],
      });
    }
  );
};

exports.getArtigoPage = (req, res, next) => {
  res.render('index/artigo', {
    path: '/bonus-page',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0],
  });
};

exports.getInsightPage = (req, res, next) => {
  res.render('index/insight', {
    path: '/bonus-page',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0],
  });
};

exports.getCasePage = (req, res, next) => {
  res.render('index/case', {
    path: '/bonus-page',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0],
  });
};
