const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.getStartingPage);

router.get('/quem-somos', indexController.getQuemSomosPage);
router.get('/o-que-fazemos', indexController.getOQueFazemosPage);
router.get('/RCInsights', indexController.getRCInsightsPage);
router.get('/artigo', indexController.getArtigoPage);
router.get('/case', indexController.getCasePage);
router.get('/insight', indexController.getInsightPage);

module.exports = router;
