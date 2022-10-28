const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/edit-page', adminController.getAdminPage);

router.post('/banner-text-edit', adminController.postBannerText);

router.post('/index-info-section-edit', adminController.postStartingPageInfoSection);

router.post('/index-perks-edit', adminController.postStartingPagePerksEdit);

// router.post('/example')

module.exports = router;
