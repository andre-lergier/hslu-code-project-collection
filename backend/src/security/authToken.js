import jwt from 'jsonwebtoken';

export default class AuthToken {
  static secretKey = process.env.JWT_PRIVATEKEY || 'samplePrivateKey';

  static signAlgorithm = 'HS256';

  static tokenExpiry = '5d';

  constructor(payload) {
    this.token = jwt.sign(
      payload,
      AuthToken.secretKey,
      {
        algorithm: AuthToken.signAlgorithm,
        expiresIn: AuthToken.tokenExpiry,
      },
    );
  }

  static verifyToken = (token) => {
    let decoded = null;

    try {
      decoded = jwt.verify(token, AuthToken.secretKey);
    } catch (error) {
      console.log('Error while verifying token');
      throw error;
    }

    return decoded;
  }
}
