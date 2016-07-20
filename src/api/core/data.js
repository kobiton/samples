import faker from 'faker'

export function generateUser() {
  const username = `${faker.internet.userName()}${String(faker.random.number(10000))}`
  const password = faker.internet.password()
  return {
    fullname: faker.name.findName(),
    username,
    password,
    email: faker.internet.email(username)
  }
}

export const registerSchema = {
  required: true,
  type: 'object',
  properties: {
    user: {
      required: true,
      type: 'object',
      properties: {
        apiKey: {
          required: true,
          type: 'string'
        },
        id: {
          required: true,
          type: 'number'
        },
        email: {
          required: true,
          type: 'string',
          format: 'email'
        },
        username: {
          required: true,
          type: 'string'
        },
        name: {
          required: true,
          type: 'string'
        },
        createdAt: {
          required: true,
          type: 'string',
          format: 'datetime'
        },
        updatedAt: {
          required: true,
          type: 'string',
          format: 'datetime'
        }
      }
    },
    token: {
      required: true,
      type: 'string'
    }
  }
}

export const formatsConfiguration = {
  formats: {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, // eslint-disable-line max-len
    datetime: /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])T(0[1-9]|1[0-9]|2[0-4]):([0-5][0-9]|60):([0-5][0-9]|60).\d{3}Z$/ // eslint-disable-line max-len
  }
}
