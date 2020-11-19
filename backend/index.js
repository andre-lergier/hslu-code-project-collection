import express from 'express';
import bodyParser from 'body-parser';
import Database from './src/database/database.js';
import APIRouter from './src/routes/apiRouter.js';

const database = new Database();
(async () => {
  await database.connectMongoDB();

  const app = express();
  const port = process.env.PORT || 4433;

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // Mittleware
  app.use((req, res, next) => {
    // do something
    req.test = 123;
    next();
  });

  const router = new APIRouter(database);
  app.use('/projects', router.projectRoutes.router);
  app.use('/user', router.userRoutes.router);

  app.get('/', (request, res) => {
    res.status(200).send({ success: 'true', status: 'API Works', message: 'Welcome to Rest API' });
  });
  app.all('*', (req, res) => {
    res.status(404).send({ error: true, message: 'Check your URL please' });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
})();
