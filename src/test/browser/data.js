import faker from 'faker'
import BaseData from '../_data'
import _ from 'lodash/util'

class BrowserData extends BaseData {
  generateRandomUsers(number = 1) {
    return _.times(number, this.generateUser)
  }

  generateParagraphs(number = 1) {
    return faker.lorem.paragraphs(number)
  }
}

export default new BrowserData()
