const express = require('express');
const searchProductController = require('../controller/product/searchProductController');
const getProductController = require('../controller/product/getProductController');

const router = express.Router();

router.get('/items', searchProductController.searchProduct);
router.get('/items/:id', getProductController.getProduct);

module.exports = router;
