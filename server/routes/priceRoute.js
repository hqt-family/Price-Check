const express = require('express');
const router = express.Router();
const { getPrices, postPrice, putPrice, deletePrice, putSingle } = require('../controllers/priceControllers');
const { protect } = require('../middleware/authMiddleware');

router.route("/").get(protect, getPrices).post(protect, postPrice);
router.route("/:id").put(protect, putPrice).delete(protect, deletePrice);
router.route("/single/:id").put(protect, putSingle);
  
module.exports = router;