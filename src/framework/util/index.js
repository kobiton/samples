import faker from 'faker'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import mkdirp from 'mkdirp'
import config from '../config/test'
import BPromise from 'bluebird'
import DownloadProcess from './download_process'
import {debug} from '@kobiton/core-util'

/**
* Remove the slash in the string
* @param removeSlash {string} The text
*/
export function removeSlash(text) {
  return (text) ? text.replace(/\/$/, '') : text
}

/**
* Generate username
*/
export function generateUsername() {
  return `${faker.internet.userName()}${moment().format('DDMMYYYYHHmm')}`
}

/**
* Return a dummy password
*/
const dummyPassword = 'dumMyP@ssword'
export function getDummyPassword() {
  return dummyPassword
}

/**
* Generate username with domain @kms-technology.com
* @param username {string} The username
*/
export function generateEmail(username) {
  const milliseconds = Date.now()
  return `${username}+${milliseconds}-${config.emailRetainingToken}@kms-technology.com`
}

/**
* Generate a test email
*/
export function generateTestEmail() {
  return faker.internet.email()
}

/**
* Generate a test fullname
*/
export function generateFullname() {
  return faker.name.findName()
}

/**
* Generate text with the length of text
* @param length {integer} The username
*/
export function generateRandomText(length = 100) {
  const randomString = faker.lorem.paragraphs(8)
  const text = randomString.replace(/\s/g, '').replace(/\./g, '')
  return text.slice(0, length)
}

/**
* Create a folder to save files into it
* @param folderPath {string} The folder path
*/
export function prepareFolderSync(folderPath) {
  if (!fs.existsSync(folderPath)) {
    mkdirp.sync(folderPath)
  }
}

/**
* Get child files
* @param folderPath {string} The folder path
*/
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

/**
* Get meta data
* @param text {string} The text
*/
export function extractEmmbedMetadata(text) {
  try {
    const jsonText = text.match(/{.*}/)
    return JSON.parse(jsonText) || {}
  }
  catch (ignored) {
    return {}
  }
}

/**
* Convert error to json data
* @param err {string} The error
*/
export function errorToJSON(err) {
  const res = {}
  if (err) {
    Object.getOwnPropertyNames(err).forEach(function (key) {
      res[key] = err[key]
    }, err)
  }
  return res
}

/**
* Get the odd days
* @param days {integer} How many days that you want to extract odd days
*/
export function subtractDays(days) {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)
}

/**
* Get the start date
* @param text {string} The string contains the start date
*/
export function extractStartDate(text) {
  return (text) ? text.toString().match(/startDate=([0-9]+)/g)[0].replace('startDate=', '') : text
}

/**
* Get the end date
* @param text {string} The string contains the end date
*/
export function extractEndDate(text) {
  return (text) ? text.toString().match(/endDate=([0-9]+)/g)[0].replace('endDate=', '') : text
}

/**
* Compare two arrays
* @param array1 {array} The first array
* @param array2 {array} The second array
*/
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

/**
* Download application from S3 link and save to local
* @param appUrl {string} The download link Ex: S3 link
* @param target {string} The destination of downloaded file
*/
export function downloadApp(appUrl, target) {
  return new BPromise((resolve, reject) => {
    const download = new DownloadProcess()
    const downloadUrl = appUrl
    debug.log('Download file:', downloadUrl)
    if (target) {
      download.download(downloadUrl, target)
    }
    else {
      download.download(downloadUrl)
    }
    download
      .on('progress', (state) => debug.log('Progress', JSON.stringify(state)))
      .on('finish', (file) => {
        debug.log('setup', `Finished download file ${file}`)
        resolve(file)
      })
      .on('error', (err) => {
        debug.error('Error', err)
        reject(err)
      })
  })
}

/**
* Get the real path of a file
* @param folderPath {string} The folder path
* @param appName {string} The application name
*/
export function getRealPath(folderPath, appName) {
  prepareFolderSync(folderPath)
  const appDirPath = fs.realpathSync(folderPath)
  return path.join(appDirPath, appName)
}

/**
* Check if the file exists or not.
* @param filePath {string} The file path
*/
export function fileExists(filePath) {
  return fs.existsSync(filePath)
}

/**
* Convert a date string/object to a timestamp with proper timezone
* @param dateString {string} Ex: '24-Nov-2009' or 'Oct 01 2017'
*/
export function toTimestamp(dateString) {
  return (dateString) ? Date.parse(new Date(dateString)) : Date.parse(new Date())
}
