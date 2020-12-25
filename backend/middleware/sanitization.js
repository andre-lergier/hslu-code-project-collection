import expv from 'express-validator';

export default class Sanitization {
  static projects = [];

  static user = {
    login: [
      expv.body('email')
        .isEmail().withMessage('Must be a valid Email address')
        .normalizeEmail()
        .trim()
        .escape(),
      expv.body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Must be at least 8 chars long')
        .escape(),
    ],
    signup: [
      expv.body('firstname')
        .trim()
        .escape(),
      expv.body('familyname')
        .trim()
        .escape(),
      expv.body('email')
        .isEmail().withMessage('Must be a valid Email address')
        .normalizeEmail()
        .trim()
        .escape(),
      expv.body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Must be at least 8 chars long'),
    ],
  }

  static project = {
    create: [
      expv.body('title')
        .not().isEmpty()
        .trim()
        .escape(),
      expv.body('category')
        .not().isEmpty()
        .trim()
        .escape(),
      expv.body('year')
        .isInt({ min: 1000, max: 9999 })
        .trim()
        .escape(),
      expv.body('private')
        .isBoolean()
        .trim()
        .escape(),
    ],
  }

  static checkValidationResults = (request, response, next) => {
    const errors = expv.validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        success: false,
        message: 'Validation failed',
        fieldErrors: errors.array(),
      });
    }

    return next();
  }
}
