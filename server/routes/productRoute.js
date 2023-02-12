const express = require('express');
const { getProducts, getProductsByTitle } = require('../controllers/productControllers');
const router = express.Router();

router.get('/all', getProducts);
router.get('/filter', getProductsByTitle);

module.exports = router;