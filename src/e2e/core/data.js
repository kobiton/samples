import _ from 'lodash'
import Faker from 'Faker'
import moment from 'moment'

// Each loop time takes approximately two minutes
export const smallListSearchTerms = generateTerms(5)
export const shortListSearchTerms = generateTerms(30)
export const longListSearchTerms = generateTerms(60)
export const hugeListSearchTerms = generateTerms(120)

export const actual = {
  id: '0',
  createdAt: null,
  endedAt: null,
  duration: null,
  endState: null,
  udid: null,
  deviceName: null
}

export const expected = {
  createdAt: moment(),
  endedAt: null,
  duration: null
}

function generateTerms(times) {
  return _.times(times,
    () => Faker.Name.findName()
  )
}
