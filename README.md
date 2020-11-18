# Project collection with Vue.js, MongoDB & Rest

Personal mentoring project with [Maria Husmann](https://github.com/mhusm)  
HS2020  
Hochschule Luzern, Digital Ideation

---

## Technical Challenges :rocket:
With this project I want to try out technologies, I never used before or I'm not yet very used to.

- [Vue.js v**3**](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Rest](https://restfulapi.net/)
- [Node.js v**14**](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios]()
- [CSS Grid]()

---

## Project setup frontend
```
cd frontend
```

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

---

# Documentation

## Architecture  

## Technologies  

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

## Typescript
#### Tutorials:
- [Using TypeScript with Vue Single File Components](https://www.digitalocean.com/community/tutorials/vuejs-using-typescript-with-vue)

## Backend
- https://www.robinwieruch.de/minimal-node-js-babel-setup
- If using Typescript:
  - [1 Setup REST API](https://levelup.gitconnected.com/setup-restful-api-with-node-js-express-mongodb-using-typescript-261959ef0998)
  - [2 Project structure and Building Routes in REST API](https://levelup.gitconnected.com/project-structure-and-building-routes-of-restful-api-with-node-js-f3a8b53d94e7)
- Simple Approach: https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
- https://medium.com/weekly-webtips/how-to-create-a-rest-api-with-express-js-and-node-js-3de5c5f9691c

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
| 501  | Not Implemented       |


## Prototype
For concept and design purposes I created a simple prototype using [Figma](https://www.figma.com/).  
Launch the prototype with this link: https://www.figma.com/file/5cJqJfXD5euCykWQKnMR2E/Home?node-id=0%3A1