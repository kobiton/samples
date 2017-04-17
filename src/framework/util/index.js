import faker from 'faker'
import fs from 'fs'
import moment from 'moment'
import mkdirp from 'mkdirp'
import config from '../config/test'

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
