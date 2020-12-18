import bcrypt from 'bcrypt';

import AuthToken from '../../src/security/authToken.js';
import HashedPassword from '../../src/security/hashedPassword.js';

export default class UserControllers {
  constructor(database) {
    this.database = database;
  }

  async get(request, response) {
    try {
      const result = await this.database.getProjects();
      return response.status(201).send({
        success: true,
        message: 'users',
        projects: result,
      });
    } catch (error) {
      console.log('Error UserControllers get');
      console.error(error);

      return response.status(400).send({
        success: false,
        error,
      });
    }
  }

  async getSingle(request, response) {
    // email from url
    const { email } = request.params;

    // make sure to only return user data to logged in user
    /* if (!request.isAuth) {
      return response.status(401).json({
        success: false,
        message: 'Not aaauthorized to get this information.',
      });
    } */
    if (email !== request?.userEmail) {
      return response.status(401).json({
        success: false,
        message: 'Not authorized to get this information.',
      });
    }

    try {
      const result = await this.database.getUser(email);
      return response.status(201).send({
        success: true,
        message: 'user',
        user: result,
      });
    } catch (error) {
      console.log('Error UserControllers getSingle');
      console.error(error);

      return response.status(400).send({
        success: false,
        error,
      });
    }
  }

  async create(request, response) {
    const user = request.body;

    const { name, email, password } = user;
    const hashedPassword = await HashedPassword.hash(password);

    const doc = {
      name,
      email,
      password: hashedPassword,
    };

    // if new user request is by authorized user, allow it
    if (request.isAuth) {
      doc.authorizedByAdmin = true;
    } else {
      doc.authorizedByAdmin = false;
    }

    try {
      const checkUser = await this.database.getUser(email);
      if (checkUser) {
        return response.status(409).json({
          success: false,
          message: 'User exists already!',
        });
      }

      const result = await this.database.insertUser(doc);
      return response.status(201).json({
        success: true,
        message: 'user added successfully',
        userId: result.insertedId,
      });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: error.toString(),
        error,
      });
    }
  }

  async login(request, response) {
    const { email, password } = request.body;

    try {
      const user = await this.database.getUser(email, true);
      // const pwMatch = user ? user.password === password : false;

      const pwMatch = user ? await bcrypt.compare(password, user.password) : false;

      if (user && pwMatch && user.authorizedByAdmin) {
        delete user.password;

        const payload = {
          userId: user._id,
          email: user.email,
        };
        const jwt = new AuthToken(payload).token;

        console.log(AuthToken.verifyToken(jwt));

        return response.status(201).json({
          success: true,
          message: 'login successfully',
          token: jwt,
          user,
        });
      }

      // user not found
      // pw does not match
      // not authorized by admin
      return response.status(401).json({
        success: false,
        message: 'Authentication failed',
      });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Authentication failed',
        error: error.toString(),
      });
    }
  }
}
