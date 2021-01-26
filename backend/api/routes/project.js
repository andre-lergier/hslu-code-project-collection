import express from 'express';

import ProjectControllers from '../controllers/project.js';
import checkAuthorization from '../../middleware/auth.js';
import Sanitization from '../../middleware/sanitization.js'

export default class ProjectRoutes {
  constructor(database) {
    this.router = express.Router();
    this.controller = new ProjectControllers(database);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', checkAuthorization, this.controller.get.bind(this.controller));
    this.router.get('/:url', checkAuthorization, this.controller.getSingle.bind(this.controller));

    this.router.post('/', Sanitization.project.create, Sanitization.checkValidationResults, checkAuthorization, this.controller.create.bind(this.controller));

    this.router.patch('/:id', (req, res) => res.status(304).send('Received a Patch HTTP method'));

    this.router.delete('/:id', checkAuthorization, this.controller.delete.bind(this.controller));
  }
}
