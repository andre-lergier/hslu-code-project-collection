import express from 'express';
import bodyParser from 'body-parser';
import Database from './src/database/database.js';
import Router from './src/routes/router.js';

const database = new Database();
await database.connectMongoDB();
// await database.dropProjects();

const app = express();
const port = process.env.API_PORT || 4433;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Mittleware
app.use((req, res, next) => {
  // do something
  req.test = 123
  next();
});

/**
 * REST Requests
 */
app.get('/', (request, res) => {
  res.status(200).send({success: 'true',status: 'API Works', message: 'Welcome to Rest API',
  });
});

const router = new Router(database).router;
app.use('/', router)

app.put('/', (req, res) => {
  return res.status(304).send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.status(304).send('Received a DELETE HTTP method');
});

app.all('*', function (req, res) {
  res.status(404).send({ error: true, message: 'Check your URL please' });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
