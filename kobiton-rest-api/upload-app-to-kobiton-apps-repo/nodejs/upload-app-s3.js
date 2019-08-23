const request = require('request');
const fs = require('fs');
const btoa = require('btoa');
const USERNAME =  process.env.USERNAME
const API_KEY =  process.env.API_KEY
const FILE_NAME =  process.env.FILE_NAME
const APP_PATH = process.env.APP_PATH
const stats = fs.statSync(APP_PATH)
const inputBody = {
  'filename': `${FILE_NAME}`
};

const base64EncodedBasicAuth = btoa(`${USERNAME}:${API_KEY}`)
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
        url: 'https://api-test.kobiton.com/v1/apps/uploadUrl',
        json: true,
        method: 'POST',
        body: inputBody,
        headers: headers
      }, function (err, response, body) {
        
        if (err || response.statusCode != 200) {
          console.log(err)
          return reject(err);
        
        }
        console.log('Response body:', body);
        console.log('Uploading...')
        resolve(body);
      })
    })
  console.log('Step 2: Upload File To S3')
    const uploaddile = await new Promise((resolve, reject) => {
      fs.createReadStream(APP_PATH).pipe(
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
                  return reject(err);
              }
            console.log('Create App Version ...')
            resolve(body)
          }
        )
      );
    })
console.log('Step 3: Create Application Or Version')
  const createAppVersion = await new Promise((resolve, reject) => {
    request({
      url: 'https://api-test.kobiton.com/v1/apps',
      json: true,
      method: 'POST',
      body: {
        'filename' : `${FILE_NAME}`,
        'appPath': `${getUrl.appPath}`
      },
      headers: headers
    }, function (err, response, body) {
      if (err) {
        console.error('Error:', err);
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

main();
