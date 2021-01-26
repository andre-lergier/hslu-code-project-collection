# Code Project Collection with Vue.js, MongoDB, REST API
This website helps me to keep an overview of git repositories on different platforms, dev-, stage- and production-deployments and their particular hosting.  
The data is stored in a `MongoDB` and is accessed with a `REST API`. The frontend is based on `Vue.js`.  


>Personal mentoring project with [Maria Husmann](https://github.com/mhusm)  
Hochschule Luzern, Digital Ideation, HS2020  



## Technical Challenges :rocket:
The sense behind this project is to try out and learn new technologies, concepts and libraries I never used before or don't know yet very well.  
These are the key technologies I wanted to learn:
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [REST API](https://restfulapi.net/)
- [Express](https://expressjs.com/)
- [Axios](https://github.com/axios/axios)
- [JWT](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [Vue.js **3**](https://v3.vuejs.org/)
- [Node.js **14**](https://nodejs.org/)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)


## Run Project ⚙️

### Setup
```zsh
npm run setup
```

### Development Frontend
Compiles and hosts server for development
```zsh
npm run frontend
```
or
```zsh
cd frontend
npm run serve
```

### Build Frontend
```zsh
npm run frontend-build
```
or
```zsh
cd frontend
npm run build
```

### Backend
Connects to MongoDB and starts API-Server
```
npm run backend
```
or
```
cd backend
npm run dev
```

__Public Website:__ [code.lergier.ch](https://code.lergier.ch)  
__API HTTP:__ [api.code.lergier.ch](http://api.code.lergier.ch)  
__API HTTPS:__ [hslu-code-project-collection.herokuapp.com](https://hslu-code-project-collection.herokuapp.com/)

---

# Documentation 📔

<!-- ## Architecture  📐

> Code to deploy to Heroku:  
```git subtree push --prefix backend heroku master```
-->

## Views
### Project overview
The main view of the website is the project overview. Projects are grouped in categories and ordered by the date and their name.   
If the user isn't logged in, the page shows less information.
![Main view not logged in](readme-assets/views/home.png)

### Projects
If the user is logged in, the application shows more information.
![Projects view](readme-assets/views/projects-logged-in.png)

### Login
If a user has an account he can login using his email and password.
![Login view](readme-assets/views/login.png)

### Create/Request an Account
![Create Account view](readme-assets/views/create.png)

### Create Project
Logged in users can create new projects.
![New Project](readme-assets/views/new-project.png)


## Technologies 💡

### Vue 3
View 3 was only a few weeks old when I started with this project.  
I didn't experience big differences or improvements. For me the biggest change was using `TypeScript` instead of normal `JavaScript`.

To setup the project I used the newest version of __[Vue CLI](https://cli.vuejs.org/guide/)__ with the following options:
![Vue CLI Settingns](readme-assets/vue-cli-settings.png)

Helpful Links:
- [Vue 3 Documentationn](https://v3.vuejs.org/)
- [Vue+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/vue)
- [Vuex 4 Documentation](https://next.vuex.vuejs.org/)
- [Vue Router 4 Documentation](https://next.router.vuejs.org/)


### MongoDB
In all my previous projects with a database I used a relational SQL-DB. So this is the very first time for me to try out a no SQL, file based database. Simply explained, in a noSQL Database the data isn’t stored in columns and rows but in files.  
  
A lot of Tutorials use the Mongoose library to interact with the Database. After looking at the Node.js documentation from MongoDB I decided to use the native driver instead of this external library.

#### MongoDB vs SQL

![m100-database-terminology](https://university-courses.s3.amazonaws.com/M100/m100-database-terminology.png)  

Documents are organized in Collections. In a SQL-DB, a collection would be a table and a row a document. Data is organized in field-value pairs, like *key & value* in JSON or a JS object. →
A document is stored in `BSON` format, which means *Binary* JSON. BSON for example allows additional data types like `Integer`, `Long`, `Float`, `Date`.  

__Clusters:__ Group of servers that store your data.  
__Replica Set:__ A few connected machines that store the same data to ensure that if something happens to one of the machines the data will remain intact.  

Every document in MongoDB has a unique `_id` field: `"_id": "..."`


#### Important Commands
| **Command** | **Description** |
|---|---|
| `show dbs` | Show list of databases in the cluster |
| `use [databaseName]` | Go to a database inside Cluster |
| `show collections` | Show all collections (tables) inside the selected database |
| `db.[collectionName].find( {"state":"NY", "city":"ALBANY"} )` | Search content in a table, shows matching documents. The query are the same as when used on data explorer (If step 2 is done, db is an alias for the selected database) |
| `[find(...)].count()` | Number of elements |
| `[find(...)].pretty()` | Prettify text to be easy readable |
| `db.[collectionName].findOne()` | Show random document |
| `db.[collectionName].insert({...}) db.[collectionName].insert([{ ... }, { ... }]) db.[collectionName].insert([{ ... }, { ... }], { "ordered": false })` | Insert new document Without "ordered": false inserting will stop if there is an error |
| `db.[collectionName].updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })` <br> `db.grades.updateOne({ "student_id": 250, "class_id": 339 }` <br> `{ "$push": { "scores": { "type": "extra credit", "score": 100 } } })` | $inc: increment <br>$set: new value <br>$push: add new object to array |
| `db.[collectionName].deleteMany({ "test": 1 }) db.[collectionName].deleteOne({ "_id": 3 })` | Delete document |
| `db.[collectionName].drop()` | Delete collection When all collections are dropped from a database, the database no longer appears in the list of databases when you run show dbs. |


#### Tutorials
To get startet with MongoDB I used [MongoDB University](https://university.mongodb.com/). I made parts of the following tutorials:
- [M001: MongoDB Basics](https://university.mongodb.com/courses/M001/about)
- [M100: MongoDB for SQL Pros](https://university.mongodb.com/courses/M100/about)
- [M103: Basic Cluster Administration](https://university.mongodb.com/courses/M103/about)

#### More Links
- [What is MongoDB](https://www.mongodb.com/what-is-mongodb) (Nice basic examples)
- [Structure Data for MongoDB](https://docs.mongodb.com/guides/server/introduction/)
- [MongoDB Node Driver](https://docs.mongodb.com/drivers/node/)
  - [Node QuickStart](https://docs.mongodb.com/drivers/node/quick-start)
  - [Node CRUD Operations](https://docs.mongodb.com/drivers/node/fundamentals/crud) (CRUD = Create, Read, Update, Delete)
  - [Node Driver Documentation](http://mongodb.github.io/node-mongodb-native/3.6/)
  - [Node Driver API](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html)
- [MongoDB Data Modeling](https://docs.mongodb.com/manual/core/data-modeling-introduction/)
- [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)
  - [Validation in Compass](https://docs.mongodb.com/compass/master/validation)
  -[`$jsonSchema`](https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/)
- [1:n Relationships](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)  



### Typescript 
For the Vue 3 frontend of my application I used Typescript.  
I'm very used to write JS and it was somehow strange to change the way you write your normal code.
Because I already wrote code in typed languages like Java or Swift it wasn't really hard to understand how it works.

#### Datatypes
These are the most important dataypes in Typescript.

```typescript
// Basic
let boolean: boolean = false;
let number: number = 8;
let string: string = "blue";
let notSure: unknown = 4;

noReturn = (): void => {}

// Array
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number] = ["hello", 10];
```

#### Tutorials:
- [Using TypeScript with Vue Single File Components](https://www.digitalocean.com/community/tutorials/vuejs-using-typescript-with-vue)


__More Links:__
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## API
To access and manage the database I wanted to write an API. This brings the benefits of an independent backend, so you can access the data from every client.

### RESTful

#### HTTP Status Codes
| Code | Status                |
|------|-----------------------|
| 200  | OK                    |
| 404  | Not found             |
| 500  | Internal Server Error |
|      |                       |
| 201  | Created               |
| 204  | No Content            |
| 304  | Modified              |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 409  | Conflict              |
| 501  | Not Implemented       |

### Express
- [CORS](https://github.com/expressjs/cors)

### Axios
- [Vue.js REST API Consumption with Axios](https://www.digitalocean.com/community/tutorials/vuejs-rest-api-axios)

### Security
For the Login authorization I use the great technology of __JSON Web Tokens__.
A JSON Web Token consists of 3 parts sperated by dots: `Header`, `Payload` and `Signature`: `xxxxx.yyyyy.zzzzz`  
Each part then is __`Base64Url`__ encoded.

When a users logs in successfully the API Server responds a JWT.

__HTTP Request:__
```json
{
    "email": "admin@lergier.ch",
    "password": "myPassword"
}
```

__Server Response:__
```json
{
    "success": true,
    "message": "Login successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmY3MmY4Y2MwYzg3ZTQ4MTA2NzAyYzYiLCJlbWFpbCI6ImFkbWluQGxlcmdpZXIuY2giLCJpYXQiOjE2MTAwNDk0MjcsImV4cCI6MTYxMDQ4MTQyN30.kwAqGeT9IFvX40QoST0T1r7JyPJ4XPKv_p_5nsfZXF4",
    ...
}
```

Analyzing the token using the [debugger](https://jwt.io/#debugger), it becomes clear what's stored inside it.
![JWT Debugger](readme-assets/jwt-debugger.png)

The important payload data in this response is the user information.
```json
{
  "userId": "5ff72f8cc0c87e48106702c6",
  "email": "admin@lergier.ch",
  "iat": 1610049427,
  "exp": 1610481427
}
```

Using the right private key ``lets you verify the signature. This ensures that the data in the payload section wasn't changed.

#### Links:
- [Introduction JWT](https://jwt.io/introduction/)
- [Documentation JWT](https://github.com/auth0/node-jsonwebtoken)

#### Password Handling
To hash the password before saving it to the database I use `bcrypt`. This makes the handling with passwords easy and safe. `bcrypt` then offers nice functinos to compare the password of the user with the hashed one in the database.  

[Documentation bcrypt](https://github.com/kelektiv/node.bcrypt.js)

#### Sanitization
To sanitize the user requests I use `express-validator` as a middleware on the server.
- [```express-validator```](https://express-validator.github.io/docs/index.html)
  - [```validator.js```](https://github.com/validatorjs/validator.js#validators)


### Tutorials 

__If using Typescript:__  
- [1 Setup REST API](https://levelup.gitconnected.com/setup-restful-api-with-node-js-express-mongodb-using-typescript-261959ef0998)
- [2 Project structure and Building Routes in REST API](https://levelup.gitconnected.com/project-structure-and-building-routes-of-restful-api-with-node-js-f3a8b53d94e7)  
- [Using TypeScript with MongoDB](https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef)


__Simple Approaches:__
- https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
- https://medium.com/weekly-webtips/how-to-create-a-rest-api-with-express-js-and-node-js-3de5c5f9691c  


__Tutorial Series from Robin Wieruch:__
- [The minimal Node.js with Babel Setup](https://www.robinwieruch.de/minimal-node-js-babel-setup)
- [How to setup Express.js in Node.js](https://www.robinwieruch.de/node-js-express-tutorial)
- [How to create a REST API with Express.js in Node.js](https://www.robinwieruch.de/node-express-server-rest-api)
- [Setup MongoDB with Mongoose in Express](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
- [Creating a REST API with Express.js and MongoDB](https://www.robinwieruch.de/mongodb-express-node-rest-api/)
- [How to handle errors in Express](https://www.robinwieruch.de/node-express-error-handling)


## Prototype 📐
For concept and design purposes I created a simple prototype using [Figma](https://www.figma.com/).  
Launch the prototype with this link: https://www.figma.com/file/5cJqJfXD5euCykWQKnMR2E/Home?node-id=0%3A1
