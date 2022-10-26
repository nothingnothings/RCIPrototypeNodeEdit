const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/edit-page', adminController.getAdminPage);

router.post('/banner-text-edit', adminController.postBannerText);


// router.post('/example')

module.exports = router;
