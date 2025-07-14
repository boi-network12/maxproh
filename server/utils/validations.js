const { body, validationResult } = require('express-validator');

// Load allowed admin emails from .env
const allowedAdminEmails = process.env.ALLOWED_ADMIN_EMAILS
  ? process.env.ALLOWED_ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase())
  : [];

exports.registerValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'influencer'])
    .withMessage('Role must be user, admin, or influencer')
    .custom((value, { req }) => {
      if (value === 'admin' && !allowedAdminEmails.includes(req.body.email.toLowerCase())) {
        throw new Error('Email is not authorized to be an admin');
      }
      return true;
    }),
  body('socialMediaProfiles.instagram')
    .optional()
    .isURL()
    .withMessage('Please provide a valid Instagram URL'),
  body('socialMediaProfiles.twitter')
    .optional()
    .isURL()
    .withMessage('Please provide a valid Twitter URL'),
  body('socialMediaProfiles.tiktok')
    .optional()
    .isURL()
    .withMessage('Please provide a valid TikTok URL'),
  body('socialMediaProfiles.youtube')
    .optional()
    .isURL()
    .withMessage('Please provide a valid YouTube URL')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.updateRoleValidation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'influencer'])
    .withMessage('Role must be user, admin, or influencer')
    .custom(async (value, { req }) => {
      if (value === 'admin') {
        const User = require('../models/User');
        const user = await User.findById(req.body.userId);
        if (!user || !allowedAdminEmails.includes(user.email.toLowerCase())) {
          throw new Error('Email is not authorized to be an admin');
        }
      }
      return true;
    }),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

exports.pricingValidation = [
  body('socialMediaPlatform')
    .isIn(['instagram', 'facebook', 'twitter', 'youtube', 'tiktok'])
    .withMessage('Invalid social media platform'),
  body('unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a positive number'),
  body('quantity')
    .isIn([10, 100, 500, 1000, 2000, 5000])
    .withMessage('Quantity must be one of 10, 100, 500, 1000, 2000, 5000'),
];

exports.updatePricingValidation = [
  body('socialMediaPlatform')
    .optional()
    .isIn(['instagram', 'facebook', 'twitter', 'youtube', 'tiktok'])
    .withMessage('Invalid social media platform'),
  body('unitPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a positive number'),
  body('quantity')
    .optional()
    .isIn([10, 100, 500, 1000, 2000, 5000])
    .withMessage('Quantity must be one of 10, 100, 500, 1000, 2000, 5000'),
];