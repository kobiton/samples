exports.invalidCaps = [{
  browserName: 'chrome',
  platformName: '',
  platformVersion: '4.4.4',
  deviceName: 'Invalid deviceName'
},
{
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '4.4.4',
  deviceName: 'Invalid deviceName'
},
{
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '4.4.4',
  deviceName: ''}
]

exports.nonExistCapConfig = {
  threadCount: 500,
  cap: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: 'Invalid deviceName'
  }
}
