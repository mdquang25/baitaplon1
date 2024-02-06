const express = require('express');
const router = express.Router();
const newsController = require('../public/app/viewsController/NewsController');

router.put('/modify/updated', newsController.updatedNews);
router.post('/add-news/added', newsController.addedNews);
router.patch('/modify/delete-news/:id', newsController.deleteNews);
router.delete('/trash/permanent-delete-news/:id', newsController.permanentDeleteNews);
router.get('/trash/restore/:id', newsController.restoreNews);
router.get('/trash', newsController.trashNews);
router.post('/modify/deleteCheckbox', newsController.deleteCheckboxes);
router.get('/modify/:slug', newsController.updateNews);
router.get('/modify', newsController.modifyNews);
router.get('/add-news', newsController.addNews);
router.get('/watch-news/:slug', newsController.watchNews);
router.get('/', newsController.index);

module.exports = router;
