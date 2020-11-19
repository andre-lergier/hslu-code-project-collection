import express from 'express';

import UserControllers from '../controllers/user.js';

export default class UserRoutes {
  constructor(database) {
    this.router = express.Router();
    this.controller = new UserControllers(database);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.controller.get.bind(this.controller));
    this.router.get('/:url', this.controller.getSingle.bind(this.controller));

    this.router.post('/', this.controller.create.bind(this.controller));

    this.router.put('/', (req, res) => res.status(304).send('Received a PUT HTTP method'));

    this.router.delete('/', (req, res) => res.status(304).send('Received a DELETE HTTP method'));
  }
}
