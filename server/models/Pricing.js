const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  socialMediaPlatform: {
    type: String,
    required: [true, 'Social media platform is required'],
    trim: true,
  },
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [0, 'Unit price cannot be negative'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  totalPrice: {
    type: Number,
    default: function () {
      return this.unitPrice * this.quantity;
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pricing', pricingSchema);