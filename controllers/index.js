const keys = require('../config/keys');

exports.getStartingPage = (req, res, _next) => {


  console.log(req.flash('message'), 'FLASHMESSAGE');



  return res.render('index/index', {
    path: '/',
    message: 'Banner da página 2 atualizado com sucesso.',
    errorMessage: ''
  
  });
};

exports.getOQueFazemosPage = (req, res, next) => {
  res.render('index/o-que-fazemos', {
    path: '/o-que-fazemos',
    message: '',
    errorMessage: ''
  });
};

exports.getQuemSomosPage = (req, res, next) => {
  res.render('index/quem-somos', {
    path: '/quem-somos',
    message: '',
    errorMessage: ''
  });
};

exports.getRCInsightsPage = (req, res, next) => {
  res.render('index/RCInsights', {
    path: '/RCInsights',
    message: '',
    errorMessage: ''
  });
};

exports.getArtigoPage = (req, res, next) => {
  res.render('index/artigo', {
    path: '/bonus-page',
    message: '',
    errorMessage: ''
  });
};

exports.getInsightPage = (req, res, next) => {
  res.render('index/insight', {
    path: '/bonus-page',
    message: '',
    errorMessage: ''
  });
};

exports.getCasePage = (req, res, next) => {
  res.render('index/case', {
    path: '/bonus-page',
    message: '',
    errorMessage: ''
  });
};
