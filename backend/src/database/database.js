/* eslint-disable no-console */
import mongodb from 'mongodb';
import { projectValidator, userValidator } from './validators.js';
import defaultProjects from '../data/projects.js';
import defaultUsers from '../data/users.js';
import HashedPassword from '../security/hashedPassword.js';

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

  createUserCollection() {
    return this.db.createCollection('users', {
      validator: {
        $jsonSchema: userValidator,
      },
    });
  }

  initDatabase() {
    this.createProjectCollection();
    this.createUserCollection();
  }

  /**
   * Projects
   */
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

  /**
   * Users
   */
  insertUser(user) {
    const collection = this.db.collection('users');
    return collection.insertOne(user);
  }

  getUser(email, sendPassword = false) {
    let options = {};

    if (!sendPassword) {
      options = {
        projection: { password: 0 },
      };
    }
    const collection = this.db.collection('users');
    return collection.findOne({ email }, options);
  }

  dropUsers() {
    return this.db.collection('users').deleteMany({});
  }

  async deleteUserCollection() {
    try {
      return await this.db.collection('users').drop();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   * ------------------------------
   *
   * Default content
   *
   * ------------------------------
   */
  initDefaultContent() {
    this.dropProjects();
    this.dropUsers();
    this.initDefaultProjects();
    this.initDefaultUsers();
  }

  async initDefaultProjects() {
    try {
      const collection = this.db.collection('projects');
      return await collection.insertMany(defaultProjects);
    } catch (error) {
      console.log('catch block database.js initDefaultProjects');
      console.error(error);
      return error;
    }
  }

  async initDefaultUsers() {
    const usersWithHashedPW = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const user of defaultUsers) {
      const {
        name, email, password, authorizedByAdmin,
      } = user;
      // eslint-disable-next-line no-await-in-loop
      const hashedPassword = await HashedPassword.hash(password);

      const doc = {
        name,
        email,
        password: hashedPassword,
        authorizedByAdmin,
      };

      usersWithHashedPW.push(doc);
    }

    try {
      const collection = this.db.collection('users');
      return await collection.insertMany(usersWithHashedPW);
    } catch (error) {
      console.log('catch block database.js initDefaultUsers');
      console.error(error);
      return error;
    }
  }
}
