const request = require('request')
const BPromise = require('bluebird')

const sendRequest = BPromise.promisify(request)

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY

const headers = {
    'Accept': 'application/json'
}

async function getOnlineDevice() {
  let response
  try {
    response = await sendRequest({
      url: `https://api.kobiton.com/v1/devices?isOnline=true&isBooked=false`,
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
  
  const {cloudDevices} = response.body
  const deviceList = await filterDeviceInfo(cloudDevices)

  if (!deviceList) {
    console.log('Online device list: ', deviceList)
  }
  else {
    console.log('There is no online device')
  }
}

async function filterDeviceInfo(deviceList) {
  if (deviceList.length === 0) {
    return null
  }

  const filteredDevices = deviceList.map((device) => {
    const {id, udid, isBooked, modelName, deviceName, platformName, platformVersion} = device
    return {id, udid, isBooked, modelName, deviceName, platformName, platformVersion}
  })

  return filteredDevices
}

async function main() {
  if(!username || !apiKey)
  {
      console.log('KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script')
      process.exit(1)
  }

  await getOnlineDevice()
}

main()
