/* eslint-disable no-console */
import mongodb from 'mongodb';
import { projectValidator } from './validators.js';
import projects from '../data/projects.js';

export default class Database {
  constructor() {
    this.user = process.env.MONGO_USER;
    this.password = process.env.MONGO_PASSWORD;
    this.mongoUrl = process.env.MONGO_URL;
    this.databaseName = process.env.MONGO_DB;

    this.MongoClient = mongodb.MongoClient;
    this.uri = `mongodb+srv://${this.user}:${this.password}@${this.mongoUrl}/${this.databaseName}?retryWrites=true&w=majority`;
    this.db = undefined;

    // this.init();
  }

  async init() {
    await this.connectMongoDB();
    await this.listCollections();
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
      throw error;
    }
  }

  listCollections() {
    try {
      return this.db.listCollections()
        .toArray() // Returns a promise that will resolve to the list of the collections
        .then((cols) => console.log('Collections', cols));
    } catch (error) {
      console.log('catch block connectMongoDB:');
      console.error(error);
      return error;
    }
  }

  createProjectCollection() {
    return this.db.createCollection('projects', {
      validator: {
        $jsonSchema: projectValidator,
      },
    });
  }

  insertProject(project) {
    const collection = this.db.collection('projects');
    return collection.insertOne(project);
  }

  getProjects(query = {}) {
    return this.db.collection('projects').find(query).toArray();
  }

  dropProjects() {
    return this.db.collection('projects').deleteMany({});
  }

  async initDefaultProjects() {
    try {
      const collection = this.db.collection('projects');
      return await collection.insertMany(projects);
    } catch (error) {
      console.log('catch block connectMongoDB:');
      console.error(error);
      return error;
    }
  }
}
