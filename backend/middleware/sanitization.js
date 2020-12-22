import expv from 'express-validator';

export default class Sanitization {
  static projects = [];

  static user = {
    login: [
      expv.body('email')
        .isEmail()
        .normalizeEmail().withMessage('Must be a valid Email address')
        .trim()
        .escape(),
      expv.body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Must be at least 8 chars long')
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
