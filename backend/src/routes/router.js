import express from 'express';

import ProjectRoutes from './projectsRoutes.js';
import * as data from './../data/projects.js'

export default class Router {
  constructor(database) {
    this.router = express.Router();
    this.database = database;

    const projectRoutes = new ProjectRoutes(this.router);

    this.router.get('/projects', (request, response) => {
      const result = database.getProjects().then((resolve, reject) => {
        response.send({
          success: 'true',
          message: 'projects',
          projects: resolve,
        });
      });

      /* const result = await database.getProjects();
      response.send({
        success: 'true',
        message: 'projects',
        projects: result
      }); */
    });

    this.router.get('/projects/:url', (request, response) => {
      const query = { 'publicLink.url': `${request.params.url}` };

      const result = database.getProjects(query).then((resolve, reject) => {
        response.send({
          success: 'true',
          message: 'project',
          projects: resolve,
        });
      });
    });

    this.router.post('/addProject', (request, response) => {
      if (!request.body.title) {
        return response.status(400).send({ success: 'false', message: 'name is required' });
      }

      let project = data.wb;
      project = request.body;

      database.insertProject(project).then((resolve) => {
        response.status(201).send({
          success: 'true',
          message: 'project added successfully',
          project: project.title,
        });
      }).catch((reject) => {
        response.status(400).send({ success: 'false', message: reject })
      });

      /* try {
        database.insertProject(project);
        return response.status(201).send({
          success: 'true',
          message: 'project added successfully',
          project: project.title,
        })
      } catch (error) {
        return response.status(400).send({ success: 'false', message: error });
      } */
    });
  }
}
