export const projectValidator = {
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