const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get(
  '/edit-page',
  adminController.getAdminPage
);

module.exports = router;
