const express = require('express');
const router = express.Router();

const tradeController = require('../../controllers/tradeController');

// Get all short URLs
router.post("/addTrade", tradeController.addTrade);

router.post("/updateTrade", tradeController.updateTrade);
router.post("/removeTrade", tradeController.removeTrade);

module.exports = router;
