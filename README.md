>Personal mentoring project with [Maria Husmann](https://github.com/mhusm)  
Hochschule Luzern, Digital Ideation, HS2020

# Code Project Collection with Vue.js, MongoDB, REST API and more
This website helps me to keep an overview of git repositories on different platforms, dev-, stage- and production-deployments and their particular hosting.  
The data is stored in a `MongoDB` and is accessed with a `REST API`. The frontend is based on `Vue.js`.


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

---

# Run Project

## Setup
```zsh
npm run setup
```

## Development Frontend
Compiles and hosts server for development
```zsh
npm run frontend
```
or
```zsh
cd frontend
npm run serve
```

## Build Frontend
```zsh
npm run frontend-build
```
or
```zsh
cd frontend
npm run build
```

## Backend
Connects to MongoDB and starts API-Server
```
npm run backend
```
or
```
cd backend
npm run dev
```

---

__Public Website:__ [code.lergier.ch](https://code.lergier.ch)  
__API HTTP:__ [api.code.lergier.ch](http://api.code.lergier.ch)  
__API HTTPS:__ [hslu-code-project-collection.herokuapp.com](https://hslu-code-project-collection.herokuapp.com/)

> Code to deploy to Heroku:  
```git subtree push --prefix backend heroku master```

---

# Documentation

## Architecture  

## Technologies 

## Vue 3
[Vue+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/vue)

### MongoDB
In all my previous projects with a database I used a relational SQL-DB. So this is the very first time for me to try out a no SQL, file based database. Simply explained, in a noSQL Database the data isn't stored in columns and rows but in files.  

#### MongoDB vs SQL

![m100-database-terminology](https://university-courses.s3.amazonaws.com/M100/m100-database-terminology.png)  

Documents are organized in Collections. In a SQL-DB, a collection would be a table and a row a document.
Data is organized in field-value pairs, like _key & value_ in JSON or a JS object.  
A document is stored in `BSON` format, which means _Binary_ JSON. BSON for example allows additional data types like `Integer`, `Long`, `Float`, `Date`.

>__Clusters:__ Group of servers that store your data.  
__Replica Set:__ A few connected machines that store the same data to ensure that if something happens to one of the machines the data will remain intact.


#### Tutorials
Those links helped me out to understand MongoDB:
- [M001: MongoDB Basics](https://university.mongodb.com/courses/M001/about)
- [M100: MongoDB for SQL Pros](https://university.mongodb.com/courses/M100/about)
- [M103]

- https://docs.mongodb.com/guides/server/introduction/

### Typescript
#### Tutorials:
- [Using TypeScript with Vue Single File Components](https://www.digitalocean.com/community/tutorials/vuejs-using-typescript-with-vue)

## API
### REST
- CRUD (Create, Read, Update, and Delete)

#### Status Codes
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
| 409  | Conflict             |
| 501  | Not Implemented       |

### Express
- [CORS](https://github.com/expressjs/cors)

### Security
A JSON Web Token consists of 3 parts sperated by dots: `Header`, `Payload` and `Signature`: `xxxxx.yyyyy.zzzzz`
- [Introduction JWT](https://jwt.io/introduction/)
- [Documentation JWT](https://github.com/auth0/node-jsonwebtoken)
- [Documentation bcrypt](https://github.com/kelektiv/node.bcrypt.js)

#### Sanitization
- [```express-validator```](https://express-validator.github.io/docs/index.html)
- [```validator.js```](https://github.com/validatorjs/validator.js#validators)

### Tutorials
__If using Typescript:__  
- [1 Setup REST API](https://levelup.gitconnected.com/setup-restful-api-with-node-js-express-mongodb-using-typescript-261959ef0998)
- [2 Project structure and Building Routes in REST API](https://levelup.gitconnected.com/project-structure-and-building-routes-of-restful-api-with-node-js-f3a8b53d94e7)  
- [Using TypeScript with MongoDB](https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef)


- Simple Approach: https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
- https://medium.com/weekly-webtips/how-to-create-a-rest-api-with-express-js-and-node-js-3de5c5f9691c  


__Tutorial Series from Robin Wieruch:__
- [The minimal Node.js with Babel Setup](https://www.robinwieruch.de/minimal-node-js-babel-setup)
- [How to setup Express.js in Node.js](https://www.robinwieruch.de/node-js-express-tutorial)
- [How to create a REST API with Express.js in Node.js](https://www.robinwieruch.de/node-express-server-rest-api)
- [Setup MongoDB with Mongoose in Express](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
- [Creating a REST API with Express.js and MongoDB](https://www.robinwieruch.de/mongodb-express-node-rest-api/)
- [How to handle errors in Express](https://www.robinwieruch.de/node-express-error-handling)


## Prototype
For concept and design purposes I created a simple prototype using [Figma](https://www.figma.com/).  
Launch the prototype with this link: https://www.figma.com/file/5cJqJfXD5euCykWQKnMR2E/Home?node-id=0%3A1