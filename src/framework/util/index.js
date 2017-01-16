import config from '../config/test'
import faker from 'faker'
import fs from 'fs'
import moment from 'moment'

export function removeSlash(text) {
  return text.replace(/\/$/, '')
}

export function generateUsername() {
  return `${faker.internet.userName()}${moment().format('DDMMYYYYHHmm')}`
}

const dummyPassword = 'dumMyP@ssword'
export function getDummyPassword() {
  return dummyPassword
}

export function generateEmail(username) {
  const milliseconds = Date.now()
  return `${username}+${milliseconds}-${config.emailRetainingToken}@kms-technology.com`
}

export function generateFullname() {
  return faker.name.findName()
}

export function prepareFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}
