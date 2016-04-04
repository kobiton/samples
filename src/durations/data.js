import _ from 'lodash'
import Faker from 'Faker'
// Each loop time takes approximately two minutes
exports.smallListSearchTerms = generateTerms(5)
exports.shortListSearchTerms = generateTerms(30)
exports.longListSearchTerms = generateTerms(60)
exports.hugeListSearchTerms = generateTerms(120)

function generateTerms(times) {
  return _.times(times,
    () => `${Faker.Name.findName()}, ${Faker.Company.companyName()}`
  )
}
