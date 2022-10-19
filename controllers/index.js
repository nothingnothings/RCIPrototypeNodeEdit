const keys = require('../config/keys');

exports.getStartingPage = (req, res, _next) => {


  console.log(req.flash('message'), 'FLASHMESSAGE');



  return res.render('index/index', {
    path: '/',
    message: '',
    errorMessage: ''
  
  });
};

exports.getOQueFazemosPage = (req, res, next) => {
  res.render('index/o-que-fazemos', {
    path: '/o-que-fazemos',
  });
};

exports.getQuemSomosPage = (req, res, next) => {
  res.render('index/quem-somos', {
    path: '/quem-somos',
  });
};

exports.getRCInsightsPage = (req, res, next) => {
  res.render('index/RCInsights', {
    path: '/RCInsights',
  });
};

exports.getArtigoPage = (req, res, next) => {
  res.render('index/artigo', {
    path: '/bonus-page',
  });
};

exports.getInsightPage = (req, res, next) => {
  res.render('index/insight', {
    path: '/bonus-page',
  });
};

exports.getCasePage = (req, res, next) => {
  res.render('index/case', {
    path: '/bonus-page',
  });
};
