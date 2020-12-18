import expv from 'express-validator';

export default class Sanitization {
  static projects = [];

  static user = {
    login: [
      expv.body('email')
        .isEmail()
        .normalizeEmail()
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
        errors: errors.array(),
      });
    }

    return next();
  }
}
