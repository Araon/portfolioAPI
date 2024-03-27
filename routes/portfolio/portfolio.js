const express = require('express');
const router = express.Router();

const portfolioController = require('../../controllers/portfolioController');

router.get("/", portfolioController.getPortfolio);
router.get("/holdings", portfolioController.getHoldings);
router.get("/returns", portfolioController.getReturns);

module.exports = router;
