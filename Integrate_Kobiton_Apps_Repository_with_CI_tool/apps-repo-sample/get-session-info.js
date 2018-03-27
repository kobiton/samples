const request = require('request')
const fs = require('fs')

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const sessionId = process.env.KOBITON_SESSION_ID
const baseUrl = 'https://api.kobiton.com/v1'

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

function getSessionInfo(sessionId, cb) {
  send({
    method: 'GET',
    path: `sessions/${sessionId}`
  }, cb)
}

function getSessionLogs(sessionId) {
  getSessionInfo(sessionId, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    if (!body.log.downloadUrl) {
      console.log('Session logs have not been uploaded')
      return
    }
    console.log(body.log.downloadUrl)
  })
}

function getSessionVideo(sessionId) {
  getSessionInfo(sessionId, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    
    if (!body.video.path) {
      console.log('Session video has not been uploaded')
      return
    }
    console.log(body.video.path)
  })
}

getSessionLogs(sessionId)
getSessionVideo(sessionId)
