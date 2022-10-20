const keys = require('../config/keys');

exports.getStartingPage = (req, res, _next) => {
  // console.log(req.flash('message'), 'FLASHMESSAGE');
  // console.log(req.flash('errorMessage'), 'FLASHMESSAGEERROR');

  // console.log(
  //   req.flash('message')[0] !== '' ? req.flash('message')[0] : '',
  //   'LINE'
  // );



   ///////////////////////
  // if (req.flash('message') === []) {
  //   console.log('ENTERED');
  //   message = null;
  // } else {
  //   message = req.flash('message')[0];
  // }

  // if (req.flash('errorMessage') === []) {
  //   errorMessage = null;
  // } else {
  //   errorMessage = req.flash('errorMessage')[0];
  // }


  /////////////////////////////////

  return res.render('index/index', {
    path: '/',
    // message: req.flash('message')[0] !== '' ? req.flash('message')[0] : '',
    // errorMessage: req.flash('errorMessage')[0] !== '' ? req.flash('errorMessage')[0] : ''

    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getOQueFazemosPage = (req, res, next) => {
  res.render('index/o-que-fazemos', {
    path: '/o-que-fazemos',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getQuemSomosPage = (req, res, next) => {
  res.render('index/quem-somos', {
    path: '/quem-somos',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getRCInsightsPage = (req, res, next) => {
  res.render('index/RCInsights', {
    path: '/RCInsights',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getArtigoPage = (req, res, next) => {
  res.render('index/artigo', {
    path: '/bonus-page',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getInsightPage = (req, res, next) => {
  res.render('index/insight', {
    path: '/bonus-page',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};

exports.getCasePage = (req, res, next) => {
  res.render('index/case', {
    path: '/bonus-page',
    // message: '',
    // errorMessage: '',
    message: req.flash('message')[0],
    errorMessage: req.flash('errorMessage')[0]
  });
};
