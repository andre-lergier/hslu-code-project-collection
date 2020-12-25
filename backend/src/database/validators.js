// eslint-disable-next-line import/prefer-default-export
export const projectValidator = {
  bsonType: 'object',
  required: ['title', 'category'],
  properties: {
    title: {
      bsonType: 'string',
      description: 'must be a string and is required',
    },
    category: {
      bsonType: 'string',
      description: 'must be a string and is required',
    },
    repository: {
      bsonType: 'object',
      properties: {
        platform: {
          bsonType: 'string',
          description: 'must be a string',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string',
        },
        url: {
          bsonType: 'string',
          description: 'must be a string',
        },
      },
    },
  },
};

export const userValidator = {
  bsonType: 'object',
  required: ['email', 'password'],
  properties: {
    name: {
      bsonType: 'object',
      properties: {
        firstname: {
          bsonType: 'string',
          description: 'must be a string',
        },
        familyname: {
          bsonType: 'string',
          description: 'must be a string',
        },
      },
    },
    email: {
      bsonType: 'string',
      description: 'must be a string and is required',
    },
    password: {
      bsonType: 'string',
      description: 'must be a string and is required',
      minLength: 8,
    },
    authorizedByAdmin: {
      bsonType: 'bool',
    },
  },
};
