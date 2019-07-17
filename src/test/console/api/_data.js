import BaseData from '../../_data'

const registerSchema = {
  required: true,
  type: 'object',
  properties: {
    user: {
      required: true,
      type: 'object',
      properties: {
        id: {
          required: true,
          type: 'number'
        },
        email: {
          required: true,
          type: 'string',
          format: 'email'
        },
        username: {
          required: true,
          type: 'string'
        },
        name: {
          required: true,
          type: 'string'
        },
        createdAt: {
          required: true,
          type: 'string',
          format: 'datetime'
        },
        updatedAt: {
          required: true,
          type: 'string',
          format: 'datetime'
        }
      }
    },
    token: {
      required: true,
      type: 'string'
    }
  }
}

const formatsConfiguration = {
  formats: {
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, // eslint-disable-line max-len
    datetime: /^((19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])T(0[1-9]|1[0-9]|2[0-4]):([0-5][0-9]|60):([0-5][0-9]|60).\d{3}Z$/ // eslint-disable-line max-len
  }
}

const formatsSubscription = {
  formats: {
    planName: {
      required: true,
      type: 'string'
    },
    startedAt: {
      required: true,
      type: 'string',
      format: 'datetime'
    },
    endsAt: {
      required: true,
      type: 'string',
      format: 'datetime'
    },
    totalUsableMinutes: {
      required: true,
      type: 'number'
    },
    usedMinutes: {
      required: true,
      type: 'number'
    },
    remainingMinutes: {
      required: true,
      type: 'number'
    },
    overageMinutes: {
      required: true,
      type: 'number'
    },
    purchasedDeviceSlots: {
      required: true,
      type: 'number'
    }
  }
}

const samplePolicies = {
  'android': {
    'closeRecentApps': true,
    'browsersToCleanup': [
      'com.android.chrome',
      'org.mozilla.firefox',
      'com.opera.browser',
      'com.htc.sense.browser',
      'com.sec.android.app.sbrowser',
      'com.UCMobile.intl',
      'com.android.browser',
      'com.asus.browser',
      'mobi.mgeek.TunnyBrowser',
      'org.mozilla.firefox_beta',
      'com.opera.mini.native',
      'com.chrome.beta'
    ],
    'removeInstalledApps': true,
    'resetDeviceSettings': true,
    'removeSignedInAccounts': true,
    'removeInstalledAppsData': true
  },
  'ios': {
    'closeRecentApps': true,
    'browsersToCleanup': [
      'com.apple.mobilesafari'
    ],
    'removeInstalledApps': true,
    'resetDeviceSettings': true,
    'removeSignedInAccounts': true,
    'removeInstalledAppsData': true
  }
}

const uncheckPolicies = {
  'closeRecentApps': false,
  'browsersToCleanup': [],
  'resetDeviceSettings': false,
  'removeSignedInAccounts': false,
  'removeInstalledAppsData': false,
  'removeInstalledApps': false
}

const checkPolicies = {
  'closeRecentApps': true,
  'resetDeviceSettings': true,
  'removeSignedInAccounts': true,
  'removeInstalledAppsData': true,
  'removeInstalledApps': true
}

class APIData extends BaseData {
  getRegisterSchema() {
    return registerSchema
  }

  getFormatsConfiguration() {
    return formatsConfiguration
  }

  getFormatsSubscription() {
    return formatsSubscription
  }

  getSamplePolicies() {
    return samplePolicies
  }

  getUncheckPolicies() {
    return uncheckPolicies
  }

  getCheckPolicies() {
    return checkPolicies
  }

  generateInvalidEmails() {
    return [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      'email.@example.com',
      'email..email@example.com',
      'あいうえお@0-mail.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@-example.com',
      'email@111.222.333.44444',
      'email@example..com',
      'Abc..123@example.com',
      '”(),:;<>[]@example.com',
      'this is"really"notallowed@example.com'
    ]
  }
}

export default new APIData()
