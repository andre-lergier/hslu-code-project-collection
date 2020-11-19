import express from 'express';

import ProjectRoutes from './project.js';
import UserRoutes from './user.js';

export default class APIRouter {
  constructor(database) {
    this.router = express.Router();

    /* this.router.get('/', (request, res) => {
      res.status(200).send({ success: 'true', status: 'API Works', message: 'Welcome to Rest API' });
    }); */

    this.projectRoutes = new ProjectRoutes(database);
    this.userRoutes = new UserRoutes(database);

    /*
    this.router.get('/projects', (request, response) => {
      const result = database.getProjects().then((resolve, reject) => {
        response.send({
          success: 'true',
          message: 'projects',
          projects: resolve,
        });
      });
    }); /*

    this.router.get('/projects/:url', (request, response) => {
      const query = { 'publicLink.url': `${request.params.url}` };

      const result = database.getProjects(query).then((resolve, reject) => {
        response.send({
          success: 'true',
          message: 'project',
          projects: resolve,
        });
      });
    }); */

    /*
    this.router.post('/addProject', async (request, response) => {
      if (!request.body.title) {
        return response.status(400).send({ success: 'false', message: 'name is required' });
      }

      let project = data.wb;
      project = request.body;

      /* database.insertProject(project).then((result) => {
        response.status(201).send({
          success: 'true',
          message: 'project added successfully',
          project: project.title,
        });
      }).catch((error) => {
        response.status(400).send({ success: 'false', message: error });
      }); */
    /*
      try {
        const res = await database.insertProject(project);
        return response.status(201).send({
          success: 'true',
          message: 'project added successfully',
          project: res.insertedId,
        });
      } catch (error) {
        return response.status(400).send({ success: 'false', message: error });
      }
    }); */
  }
}
