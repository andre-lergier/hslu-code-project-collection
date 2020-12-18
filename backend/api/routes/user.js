import express from 'express';

import UserControllers from '../controllers/user.js';
import checkAuthorization from '../../middleware/auth.js'
import Sanitization from '../../middleware/sanitization.js'

export default class UserRoutes {
  constructor(database) {
    this.router = express.Router();
    this.controller = new UserControllers(database);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/:email', checkAuthorization, this.controller.getSingle.bind(this.controller));

    this.router.post('/', checkAuthorization, this.controller.create.bind(this.controller));
    this.router.post('/login', Sanitization.user.login, Sanitization.checkValidationResults, this.controller.login.bind(this.controller));

    this.router.delete('/:id', checkAuthorization, this.controller.delete.bind(this.controller));
  }
}
