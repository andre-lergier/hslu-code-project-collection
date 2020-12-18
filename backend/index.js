import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Database from './src/database/database.js';
import APIRouter from './api/routes/apiRouter.js';

const database = new Database();

const app = express();
const port = process.env.PORT || 4433;

// parse application/x-www-form-urlencoded -> nötig?
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// enable Cross-origin resource sharing (CORS)
app.use(cors({
  origin: ['http://localhost', 'http://localhost:8080', /\.lergier\.ch$/, 'https://code.lergier.ch'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
}));

// set authorization to false
app.use((req, res, next) => {
  req.isAuth = false;
  next();
});

/**
 * DB Connection
 */
(async () => {
  try {
    await database.connectMongoDB();

    // database.initDefaultContent();

    const router = new APIRouter(database);
    app.use('/projects', router.projectRoutes.router);
    app.use('/user', router.userRoutes.router);

    app.get('/', (request, res) => {
      res.status(200).json({ success: true, status: 'API Works', message: 'Welcome to Rest API' });
    });
    app.all('*', (req, res) => {
      res.status(404).json({ success: false, message: 'Check your URL please' });
    });
  } catch (error) {
    // handle connection error
    app.all('*', (req, res) => {
      res.status(500).json({
        success: false,
        message: `Internal API error: ${error.toString()}`,
        error,
      });
    });
  } finally {
    // launch server
    app.listen(port, () => { console.log(`Server running on port ${port}!`); });
  }
})();
