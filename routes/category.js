const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.category_list);

router.get('/:id', categoryController.category_detail);

module.exports = router;