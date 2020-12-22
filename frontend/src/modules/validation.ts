import { InputValidationError, FieldsObject } from '../types/data-types';

export default class Validation {
  /**
   * Generate error message containing failing fields
   * @param errors Array from express-validator containing InputValidationErrors
   */
  static generateErrorMessage(errors: InputValidationError[]): string {
    let messageString = '';

    if (errors) {
      messageString = `Please check the following field${(errors.length > 1) ? 's' : ''}: `;

      // eslint-disable-next-line no-restricted-syntax
      for (const error of errors) {
        messageString += `${Validation.capitalizeFirstLetter(error.param)}, `;
      }

      messageString = messageString.slice(0, -2);
    }

    return messageString;
  }

  /**
   * Add error messages from express-validator to field objects
   */
  static matchInputErros(fields: FieldsObject, errors: InputValidationError[]) {
    if (errors) {
      // eslint-disable-next-line no-restricted-syntax
      for (const error of errors) {
        if (error.param in fields) {
          // eslint-disable-next-line no-param-reassign
          fields[error.param].error = error.msg;
        }
      }
    }
  }

  /**
   * Util functions
   */
  static capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}
