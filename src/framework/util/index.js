import faker from 'faker'
import fs from 'fs'
import moment from 'moment'
import mkdirp from 'mkdirp'
import config from '../config/test'

export function removeSlash(text) {
  return (text) ? text.replace(/\/$/, '') : text
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

export function generateTestEmail() {
  return faker.internet.email()
}

export function generateFullname() {
  return faker.name.findName()
}

export function generateRandomText(length) {
  const randomString = faker.lorem.paragraphs(8)
  const text = randomString.replace(/\s/g, '').replace(/\./g, '')
  return text.slice(0, length)
}

export function prepareFolderSync(folderPath) {
  if (!fs.existsSync(folderPath)) {
    mkdirp.sync(folderPath)
  }
}

const systemFiles = ['.DS_Store']
export function getChildFiles(folderPath, {ignoreSystemFiles = true} = {}) {
  const allChilds = fs.readdirSync(folderPath)
  let childFiles
  if (ignoreSystemFiles) {
    childFiles = []
    allChilds.map((file) => {
      if (!systemFiles.includes(file)) {
        childFiles.push(file)
      }
    })
  }
  else {
    childFiles = allChilds
  }

  return childFiles
}

export function extractEmmbedMetadata(text) {
  try {
    const jsonText = text.match(/{.*}/)
    return JSON.parse(jsonText) || {}
  }
  catch (ignored) {
    return {}
  }
}

export function errorToJSON(err) {
  const res = {}
  if (err) {
    Object.getOwnPropertyNames(err).forEach(function (key) {
      res[key] = err[key]
    }, err)
  }
  return res
}

export function subtractDays(days) {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)
}

export function extractStartDate(text) {
  return (text) ? text.toString().match(/startDate=([0-9]+)/g)[0].replace('startDate=', '') : text
}

export function extractEndDate(text) {
  return (text) ? text.toString().match(/endDate=([0-9]+)/g)[0].replace('endDate=', '') : text
}

export function equalArrays(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2)
}

/**
* Filter json item in json array by specific inputed criteria
* @param: jsonArray
  ex: [{ role: 'MEMBER',
      invitationStatus: 'PENDING',
      invitedEmail: 'rp6EN@gmail.com' },
    { role: 'MEMBER',
      invitationStatus: 'PENDING',
      invitedEmail: '1GwYm@gmail.com' }]
* @param: criteria
  ex: {role: 'MEMBER', invitedEmail: 'rp6EN@gmail.com'}
* Return a filtered result like below:
  ex: [{ role: 'MEMBER',
      invitationStatus: 'PENDING',
      invitedEmail: 'rp6EN@gmail.com' }]
*/
export function filterJson(jsonArray, criteria) {
  const keys = Object.keys(criteria)
  const values = Object.values(criteria)
  let result = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    result = jsonArray.filter((item) => item[key] === values[i])
    jsonArray = result
  }

  return result

}
