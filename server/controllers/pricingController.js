const Pricing = require('../models/Pricing');
const { validationResult } = require('express-validator');

exports.createPricing = async (req, res) => {
  try {
    console.log("trigged")
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { socialMediaPlatform, unitPrice, quantity } = req.body;

    let pricing = await Pricing.findOne({ socialMediaPlatform, quantity });
    if (pricing) {
      pricing.unitPrice = unitPrice;
      pricing.totalPrice = unitPrice * quantity;
      pricing.createdBy = req.user.userId;
    } else {
      pricing = new Pricing({
        socialMediaPlatform,
        unitPrice,
        quantity,
        totalPrice: unitPrice * quantity,
        createdBy: req.user.userId,
      });
    }

    await pricing.save();

    res.status(201).json({
      message: 'Pricing saved successfully',
      pricing: {
        id: pricing._id,
        socialMediaPlatform: pricing.socialMediaPlatform,
        unitPrice: pricing.unitPrice,
        quantity: pricing.quantity,
        totalPrice: pricing.totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find().populate('createdBy', 'firstName lastName email');
    res.json(pricing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { socialMediaPlatform, unitPrice, quantity } = req.body;

    const pricing = await Pricing.findById(id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }

    pricing.socialMediaPlatform = socialMediaPlatform || pricing.socialMediaPlatform;
    pricing.unitPrice = unitPrice !== undefined ? unitPrice : pricing.unitPrice;
    pricing.quantity = quantity || pricing.quantity;
    pricing.totalPrice = pricing.unitPrice * pricing.quantity;
    pricing.createdBy = req.user.userId;

    await pricing.save();

    res.status(200).json({
      message: 'Pricing updated successfully',
      pricing: {
        id: pricing._id,
        socialMediaPlatform: pricing.socialMediaPlatform,
        unitPrice: pricing.unitPrice,
        quantity: pricing.quantity,
        totalPrice: pricing.totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deletePricing = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const { id } = req.params;
    const pricing = await Pricing.findById(id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }

    await pricing.deleteOne();

    res.status(200).json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};