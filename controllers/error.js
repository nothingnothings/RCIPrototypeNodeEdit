exports.error404 = (req, res, _next) => {
  res.status(404).render('404', {
    pageTitle: 'Página não encontrada.',
    path: '',
    isLoggedIn: req.session.isLoggedIn
  });
};

exports.error500 = (req, res, _next) => {
  res.status(500).render('500', {
    pageTitle: 'Problema técnico, favor tentar novamente.',
    path: '',
    isLoggedIn: req.session.isLoggedIn
  });
};
