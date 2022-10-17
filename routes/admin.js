const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const authCheckerAndRedirecter = require('../middleware/isAuth');

router.get(
  '/edit-page',
  adminController.getAdminPage
);


router.post(
  '/banner-edit',
  adminController.bannerPost
)

module.exports = router;
