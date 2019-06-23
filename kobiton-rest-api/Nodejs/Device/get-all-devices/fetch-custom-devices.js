import request from 'request'
const username = process.env.KOBITON_USERNAME;
const apiKey = process.env.KOBITON_APIKEY;
const groupId = process.env.KOBITON_GROUP_ID || 0; 

const headers = {
    'Accept': 'application/json',
};

if(!username || !apiKey)
{
    console.log("KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script");
    process.exit(1);
};

request({
    url: 'https://api-test.kobiton.com/v1/devices',
    json: true,
    method: 'GET',
    auth: {
        user: username,
        pass: apiKey
    },
    headers: headers,
    qs: {
        groupId: groupId,
        modelName: 'N61AP',
        deviceName: 'iPhone 6',
        browserName: 'safari',
        udid: '693b40c0340d48402c843471ecc14f0905e8c967'
    },
}, (err, res, body) => {
    if (err) throw err;

    console.log('Response body:', body);
    });