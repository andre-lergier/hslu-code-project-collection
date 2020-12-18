import AuthToken from '../src/security/authToken.js';

export default (request, response, next) => {
  const authorizationHeader = request.get('Authorization');

  if (!authorizationHeader) {
    console.log('No Authorization Header provided');

    request.isAuth = false;
    request.authMessage = 'No Authorization Header provided';

    return next();
  }

  const token = authorizationHeader.replace('Bearer ', '');
  if (!token || token === '') {
    console.log('No token provided');

    request.isAuth = false;
    request.authMessage = 'No token provided';

    return next();
  }

  let decodedToken;
  try {
    decodedToken = AuthToken.verifyToken(token);
    console.log('Token verified!');
  } catch (error) {
    console.log('error verify token in auth.js');

    request.isAuth = false;
    request.authMessage = error.toString();
    return next();
  }

  request.isAuth = true;
  request.userId = decodedToken.userId;
  request.userEmail = decodedToken.email;

  next();
};
