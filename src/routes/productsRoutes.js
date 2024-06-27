const express = require('express');
const searchProductController = require('../controller/product/searchProductController');

const router = express.Router();

router.get('/items', searchProductController.searchProduct);

module.exports = router;
