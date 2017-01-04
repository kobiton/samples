import BaseData from '../../_data'

const registerSchema = {
  required: true,
  type: 'object',
  properties: {
    user: {
      required: true,
      type: 'object',
      properties: {
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

const formatsConfiguration = {
  formats: {
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, // eslint-disable-line max-len
    datetime: /^((19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])T(0[1-9]|1[0-9]|2[0-4]):([0-5][0-9]|60):([0-5][0-9]|60).\d{3}Z$/ // eslint-disable-line max-len
  }
}

class APIData extends BaseData {
  getRegisterSchema() {
    return registerSchema
  }

  getFormatsConfiguration() {
    return formatsConfiguration
  }
}

export default new APIData()
