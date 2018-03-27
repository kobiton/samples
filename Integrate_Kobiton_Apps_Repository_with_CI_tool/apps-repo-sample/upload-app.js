const request = require('request')
const fs = require('fs')

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const baseUrl = 'https://api.kobiton.com/v1'

const args = process.argv.slice(2)
const appPath = args[0]
const appName = args[1]

function getToken() {
  return new Buffer(`${username}:${apiKey}`).toString('base64')
}

function send({method = 'GET', json = true, url, path, headers, body = {}}, cb) {
  const finalHeaders = headers || {
    'authorization': `Basic ${getToken()}`,
    'content-type': 'application/json'
  }

  const requestURL = url || `${baseUrl}/${path}`

  const finalOptions = {
    method,
    json,
    url: requestURL,
    headers: finalHeaders,
    body
  }

  request(finalOptions, cb)
}

function createAppOrVersion(filename, appPath, cb) {
  send({
    method: 'POST',
    path: 'apps',
    body: {
      filename,
      appPath
    }
  }, cb)
}

function uploadFileToS3(preSignedUrl, filePath, cb) {
  const stats = fs.statSync(filePath)
  send({
    method: 'PUT',
    url: preSignedUrl,
    json: false, // Required by createReadStream
    headers: {
      'x-amz-tagging': 'unsaved=true',
      'content-length': stats.size, // Required by AWS S3
      'content-type': 'application/octet-stream'
    },
    body: fs.createReadStream(filePath)
  }, cb)
}

function generateUploadUrl(filename, cb) {
  send({
    method: 'POST',
    path: 'apps/uploadUrl',
    body: {filename}
  }, cb)
}

function uploadApp(filePath, fileName = 'appName') {
  generateUploadUrl(filePath, (error, response, uploadUrlResponse) => {
    if (error) {
      console.error(error)
      return
    }
    uploadFileToS3(uploadUrlResponse.url, filePath, (error) => {
      if (error) {
        console.error(error)
        return
      }
      createAppOrVersion(fileName, uploadUrlResponse.appPath, (error, response, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(body.appId)
      })
    })
  })
}

uploadApp(appPath, appName)
