import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const projectValidator = {
  bsonType: "object",
  required: ["title"],
  properties: {
    title: {
      bsonType: "string",
      description: "must be a string and is required"
    },
    repository: {
      bsonType: "object",
      properties: {
        platform: {
          bsonType: "string",
          description: "must be a string"
        },
        name: {
          bsonType: "string",
          description: "must be a string"
        },
        url: {
          bsonType: "string",
          description: "must be a string"
        }
      }
    }
  }
}

const createProjectCollection = async (db) => {
  db.createCollection("projects", {
    validator: {
      $jsonSchema: projectValidator
    }
 })
}

const connectMongoDB = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const db = client.db(`${process.env.MONGO_DB}`);

    await db.listCollections()
      .toArray() // Returns a promise that will resolve to the list of the collections
      .then(cols => console.log("Collections", cols));

    const collection = db.collection('projects')
    const result = await collection.insertOne({
      title: "3",
      repository: {
        platform: 'test',
        name: 'test',
        url: 'test'
      }
    })
    console.log(result.insertedId)

    // await createProjectCollection(db);
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

try {
  connectMongoDB();
} catch(e) {
  console.log('big error')
  console.error(e);
}
