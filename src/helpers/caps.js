exports.galaxy_note4_v5 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.1.1',
  deviceName: 'Galaxy Note4'
}

exports.galaxy_s5_v5 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.0',
  deviceName: 'Galaxy S5'
}

exports.galaxy_s4_ltea_v4 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '4.4.2',
  deviceName: 'Galaxy S4 LTE-A'
}

exports.galaxy_tab47_v4 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '4.4.2',
  deviceName: 'Galaxy Tab4 7.0'
}

exports.galaxy_tab410_v5 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.0.2',
  deviceName: 'Galaxy Tab4 10.0'
}

exports.galaxy_win_v4 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '4.1.2',
  deviceName: 'Galaxy Win'
}

exports.galaxy_s4_v5 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.0.1',
  deviceName: 'Galaxy S4'
}

exports.galaxy_j5_v5 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.1.1',
  deviceName: 'Galaxy J5'
}

exports.nexus5_v6 = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '6.0.1',
  deviceName: 'Nexus 5'
}
exports.existingCaps = Object.keys(exports).map((key) => exports[key])

exports.validCaps = [
  {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '6.0.1',
    deviceName: 'Nexus 5'
  }
]

exports.invalidCaps = [
  {
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
    deviceName: ''
  }
]
