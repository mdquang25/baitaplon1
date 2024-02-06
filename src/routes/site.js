const express = require('express');
const router = express.Router();
const siteController = require('../public/app/viewsController/SiteController');

router.get('/:slug', siteController.search);
router.get('/', siteController.index);

module.exports = router;
