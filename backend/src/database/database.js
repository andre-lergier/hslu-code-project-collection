import mongodb from 'mongodb';
import { projectValidator } from './validators.js';

export default class Database {
  constructor() {
    this.user = process.env.MONGO_USER;
    this.password = process.env.MONGO_PASSWORD;
    this.mongoUrl = process.env.MONGO_URL;
    this.databaseName = process.env.MONGO_DB;

    this.MongoClient = mongodb.MongoClient;
    this.uri = `mongodb+srv://${this.user}:${this.password}@${this.mongoUrl}/${this.databaseName}?retryWrites=true&w=majority`;
    this.db = undefined;
  }

  async connectMongoDB() {
    const client = new this.MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      // Connect the client to the server
      await client.connect();

      // Establish and verify connection
      await client.db('admin').command({ ping: 1 });
      console.log('Connected successfully to server');

      this.db = await client.db(`${process.env.MONGO_DB}`);
    } catch (error) {
      console.log('catch block connectMongoDB:');
      console.error(error);
    }
  }

  async listCollections() {
    try {
      return this.db.listCollections()
        .toArray() // Returns a promise that will resolve to the list of the collections
        .then((cols) => console.log('Collections', cols));
    } catch (error) {
      console.log('catch block connectMongoDB:');
      console.error(error);
    }
  }

  async createProjectCollection() {
    return this.db.createCollection('projects2', {
      validator: {
        $jsonSchema: projectValidator,
      },
    });
  }

  async insertProject(project) {
    /* try {
      const collection = this.db.collection('projects');
      return await collection.insertOne(project);
    } catch (error) {
      console.log('catch block connectMongoDB:');
      console.error(error);
    } */
    const collection = this.db.collection('projects');
    return collection.insertOne(project);
  }

  async getProjects(query = {}) {
    return this.db.collection('projects').find(query).toArray();
  }

  async dropProjects() {
    return this.db.collection('projects').deleteMany({});
  }
}
