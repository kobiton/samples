const request = require('request')
const fs = require('fs')
const btoa = require('btoa')
const user_name =  process.env.user_name
const apikey =  process.env.apikey
const file_name =  process.env.file_name
const app_path = process.env.app_path
const stats = fs.statSync(app_path)
const inputBody = {
  'filename': `${file_name}`
}

const base64EncodedBasicAuth = btoa(`${user_name}:${apikey}`)
const headers = {
  'Authorization': `Basic ${base64EncodedBasicAuth}`,
  'Content-Type':'application/json',
  'Accept':'application/json'
}

async function main() {
  
  try {
    console.log('Step 1: Generate Upload URL')
    const getUrl = await new Promise((resolve, reject) => {
      request({
        url: 'https://api.kobiton.com/v1/apps/uploadUrl',
        json: true,
        method: 'POST',
        body: inputBody,
        headers: headers
      }, function (err, response, body) {
        
        if (err || response.statusCode != 200) {
          console.log(err)
          return reject(err)
        
        }
        console.log('Response body:', body)
        console.log('Uploading...')
        resolve(body)
      })
    })
  console.log('Step 2: Upload File To S3')
    const uploaddile = await new Promise((resolve, reject) => {
      fs.createReadStream(app_path).pipe(
        request(
          {
            method: 'PUT',
            url: `${getUrl.url}`,
            headers: {
              'Content-Length': stats.size,
              'Content-Type': 'application/octet-stream',
              'x-amz-tagging': 'unsaved=true'
            }
          },  
          function (err, res, body) {
              if(err){
                  console.log('Upload file Error', err)
                  return reject(err)
              }
            console.log('Create App Version ...')
            resolve(body)
          }
        )
      )
    })
console.log('Step 3: Create Application Or Version')
  const createAppVersion = await new Promise((resolve, reject) => {
    request({
      url: 'https://api.kobiton.com/v1/apps',
      json: true,
      method: 'POST',
      body: {
        'filename': `${file_name}`,
        'appPath': `${getUrl.appPath}`
      },
      headers: headers
    }, function (err, response, body) {
      if (err) {
        console.error('Error:', err)
        return reject(err)
      }
      console.log('Response body:', body)
      resolve(body)
      console.log('Done')
    })
  })

  } 
  catch (error) {
      console.log('ERROR', error)
  }
}

main()
