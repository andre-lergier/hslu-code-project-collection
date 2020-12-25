import AuthToken from '../src/security/authToken.js';

export default (request, response, next) => {
  /**
   * Authorization Header
   */
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
    console.log('Error verify token in auth.js');
    console.log(token);
    console.log(error.toString());

    request.isAuth = false;
    request.authMessage = error.toString();
    return next();
  }

  request.isAuth = true;
  request.userId = decodedToken.userId;
  request.userEmail = decodedToken.email;
  request.userToken = token;

  return next();

  /**
   * Authorization Cookie
   */
  /* const token = request?.cookies?.token;
  if (!token || token === '') {
    console.log('No Token Cookie provided');

    request.isAuth = false;
    request.authMessage = 'No Token Cookie provided';

    return next();
  }

  let decodedToken;
  try {
    decodedToken = AuthToken.verifyToken(token);
    console.log('Token verified!');
  } catch (error) {
    console.log('Error verify token in auth.js');

    request.isAuth = false;
    request.authMessage = error.toString();
    return next();
  }

  request.isAuth = true;
  request.userId = decodedToken.userId;
  request.userEmail = decodedToken.email;

  next(); */
};
