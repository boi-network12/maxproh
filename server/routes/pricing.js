// routes/pricing.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { pricingValidation, updatePricingValidation } = require('../utils/validations');
const pricingController = require("../controllers/pricingController")
const router = express.Router();

router.post('/pricing', protect, admin, pricingValidation, pricingController.createPricing);

router.get('/pricing', protect, pricingController.getAllPricing);
router.put('/pricing/:id', protect, admin, updatePricingValidation, pricingController.updatePricing); 
router.delete('/pricing/:id', protect, admin, pricingController.deletePricing);

module.exports = router;