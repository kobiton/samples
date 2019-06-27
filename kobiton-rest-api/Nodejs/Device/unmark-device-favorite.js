import request from 'request'
import {headers, username, apiKey, groupId} from '../config'

let deviceId = 0

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
            groupId
        },
    }, (err, res, result) => {
        if (err) throw err
    
            deviceId = result.favoriteDevices[0].id

        request({
            url: `https://api.kobiton.com/v1/devices/${deviceId}/favorite`,
            json: true,
            method: 'DELETE',
            auth: {
                user: username,
                pass: apiKey
            },
            qs: {
                groupId,       
            },
        }, (err, res, body) => {
            if (err) throw err
        
            console.log('Response body:', body)
            })
        })   
