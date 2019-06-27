import request from 'request'
import {headers, username, apiKey, groupId} from '../config'

if(!username || !apiKey)
{
    console.log("KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script")
    process.exit(1)
}

request({
    url: 'https://api.kobiton.com/v1/devices',
    json: true,
    method: 'GET',
    auth: {
        user: username,
        pass: apiKey
    },
    headers,
    qs: {
        groupId,
        isOnline: 'true',
        isBooked: 'false',
        appiumDisabled: 'false'
    },
}, (err, res, body) => {
    if (err) throw err

    console.log('Response body:', body)
    })
