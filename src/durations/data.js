import _ from 'lodash'
import Faker from 'Faker'

// Each loop time takes approximately two minutes
export const smallListSearchTerms = generateTerms(5)
export const shortListSearchTerms = generateTerms(30)
export const longListSearchTerms = generateTerms(60)
export const hugeListSearchTerms = generateTerms(120)

function generateTerms(times) {
  return _.times(times,
    () => Faker.Name.findName()
  )
}
