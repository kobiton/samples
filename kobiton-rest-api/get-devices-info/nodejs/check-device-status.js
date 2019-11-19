import request from 'request'
import BPromise from 'bluebird'

const sendRequest = BPromise.promisify(request)

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_APIKEY
const deviceId = process.env.KOBITON_DEVICE_ID || 684737

const headers = {
    'Accept': 'application/json'
}

async function getDeviceStatus(deviceId) {
  let response
  try {
    response = await sendRequest({
      url: `https://api.kobiton.com/v1/devices/${deviceId}/status`,
      json: true,
      method: 'GET',
      auth: {
          user: username,
          pass: apiKey
      },
      headers
      })
  }
  catch (err) {
    console.error('Error occured while sending request to Kobiton via API', err)
  }

  if (response.statusCode != 200) {
    console.log('status:', response.statusCode)
    console.log('body:', response.body)
    process.exit(1)
  }

  return response.body
}

async function checkDeviceStatus(deviceStatus) {
  const {isBooked, isOnline} = deviceStatus

  if (isOnline && !isBooked) {
    console.log('The device is ready to use')
  }
  else if (isOnline && isBooked) {
    console.log('The device is busy')
  }
  else {
    console.log('The device is offline')
  }
}

async function main() {
  if(!username || !apiKey)
  {
      console.log("KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script")
      process.exit(1)
  }
  const deviceStatus = await getDeviceStatus(deviceId)

  await checkDeviceStatus(deviceStatus)
}

main()
