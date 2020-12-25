import bcrypt from 'bcrypt';

import AuthToken from '../../src/security/authToken.js';
import HashedPassword from '../../src/security/hashedPassword.js';

export default class UserControllers {
  constructor(database) {
    this.database = database;
  }

  async getSingle(request, response) {
    // email from url
    const { email } = request.params;

    // make sure to only return user data to logged in user (userEmail is from token)
    if (email !== request?.userEmail) {
      return response.status(401).json({
        success: false,
        message: 'Not authorized to get this information.',
      });
    }

    try {
      const result = await this.database.getUser(email);
      return response.status(200).send({
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

  async getSingleWithToken(request, response) {
    if (!request.isAuth) {
      return response.status(401).json({
        success: false,
        message: 'Authentication failed',
      });
    }

    try {
      const result = await this.database.getUser(request.userEmail);

      if (!result) {
        console.log('User doesn\'t exist');

        return response.status(401).json({
          success: false,
          message: 'Authentication failed',
        });
      }

      return response.status(200).send({
        success: true,
        message: 'User',
        token: request.userToken,
        user: result,
      });
    } catch (error) {
      console.log('Error getSingleWithToken getSingle');
      console.error(error);

      return response.status(400).send({
        success: false,
        message: 'Authentication failed',
        error,
      });
    }
  }

  async create(request, response) {
    const user = request.body;
    const { firstname, familyname, email, password } = user;

    const hashedPassword = await HashedPassword.hash(password);

    const doc = {
      name: {
        firstname,
        familyname,
      },
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

      // possible generation of jwt
      const { insertedId } = result;
      /* const payload = {
        userId: insertedId,
        email,
      };

      if (request.isAuth) {
        const jwt = new AuthToken(payload).token;
      } */

      return response.status(201).json({
        success: true,
        message: 'User added successfully',
        userId: insertedId,
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
      const pwMatch = user ? await bcrypt.compare(password, user.password) : false;

      if (user && pwMatch && user.authorizedByAdmin) {
        delete user.password;

        const payload = {
          userId: user._id,
          email: user.email,
        };
        const jwt = new AuthToken(payload).token;

        return response.status(200).json({
          success: true,
          message: 'Login successfully',
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

  async delete(request, response) {
    const { id } = request.params;

    if (!request.isAuth) {
      return response.status(401).json({
        success: false,
        message: 'Not authorized toperform this action',
      });
    }

    const checkUser = await this.database.getUserById(id);
    if (!checkUser) {
      return response.status(404).json({
        success: false,
        message: 'User does not exist',
      });
    }

    try {
      const result = await this.database.deleteUser(id);
      return response.status(200).json({
        success: true,
        message: `${result.deletedCount} user successfully deleted`,
      });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: error.toString(),
      });
    }
  }
}
