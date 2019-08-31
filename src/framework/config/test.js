import {debug} from '@kobiton/core-util'
import {parse} from './args'
import {removeSlash} from '../util'
import Url from 'url'

const args = parse()

const envVariablesToCheck = [
  'KOBITON_USERNAME_1',
  'KOBITON_PASSWORD_1',
  'KOBITON_EMAIL_USER_1',
  'KOBITON_API_URL',
  'KOBITON_API_KEY',
  'KOBITON_PORTAL_URL',
  'KOBITON_EMAIL_RETAINING_TOKEN',
  'KOBITON_REPORT_SERVER_URL',
  'KOBITON_REPORT_SECRET_KEY',
  'KOBITON_LOGS_SERVER_URL',
  'KOBITON_CONCURRENT_LOADTEST'
]
for (const envName of envVariablesToCheck) {
  if (!process.env[envName]) {
    debug.log(`WARNING: environemnt ${envName} is not defined.`)
  }
}

const apiUrl = removeSlash(process.env.KOBITON_API_URL) || 'LOCAL'
const defaultAutoTestHostName = Url.parse(apiUrl).hostname
const defaultAutoTestPort = ((Url.parse(apiUrl).port === 443) ? 80 : Url.parse(apiUrl).port) || 80

const config = {
  portalUrl: removeSlash(process.env.KOBITON_PORTAL_URL),
  apiUrl,
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL,
  autoTestHostname: process.env.KOBITON_AUTO_TEST_HOST || defaultAutoTestHostName,
  autoTestPort: defaultAutoTestPort,
  apiKey: process.env.KOBITON_API_KEY,
  username1: process.env.KOBITON_USERNAME_1,
  emailUser1: process.env.KOBITON_EMAIL_USER_1,
  password1: process.env.KOBITON_PASSWORD_1,
  username2: process.env.KOBITON_USERNAME_2,
  password2: process.env.KOBITON_PASSWORD_2,
  emailRetainingToken: process.env.KOBITON_EMAIL_RETAINING_TOKEN || 'xRT8KJ',
  concurrentLoadTest: process.env.KOBITON_CONCURRENT_LOADTEST || 20,
  longTestSuiteIterationAmount: args.longTestSuiteIterationAmount,
  expectedDurationInMinutes: args.mobileTestDuration,
  typeOfTest: args.type,
  allowW3C: args.allowW3C,
  device: {
    name: args.deviceName,
    platformName: args.platformName,
    platformVersion: args.platformVersion,
    orientation: args.deviceOrientation,
    group: args.deviceGroup,
    number: args.deviceNumbers,
    captureScreenshots: args.captureScreenshots,
    arrayUDID: args.arrayUDID,
    automationName: args.automationName,
    onlineDeviceOnly: args.onlineDeviceOnly
  },
  browser: {
    screenQuality: args.screenQuality,
    maxBrowserInstances: args.maxBrowserInstances,
    numberOfBrowser: args.numberOfBrowser,
    browserName: args.browserName,
    maxDevices: args.maxDevices
  },
  report: {
    reporter: args.reporter,
    name: args.reportName,
    serverUrl: process.env.KOBITON_REPORT_SERVER_URL || 'https://asgard.kobiton.com/data/qa-stats',
    serverSecretKey: process.env.KOBITON_REPORT_SECRET_KEY
  },
  log: {
    serverUrl: process.env.KOBITON_LOGS_SERVER_URL || 'https://logs-dev.kobiton.com',
    pushLog: args.logs
  },
  healthCheck: {
    onDeviceBusyRetryInterval: args.onDeviceBusyRetryInterval * 1000,
    maxRetry: args.onBusyDeviceRetryTimes,
    maxConcurrentDevices: args.healthCheckConcurrentDevices || 1
  },
  timeout: 120000
}

const parsedUrl = Url.parse(apiUrl)
config.autoTestHostname = parsedUrl.hostname
config.autoTestPort = (parsedUrl.protocol === 'https:' ? 443 : parsedUrl.port) || 80

let environment
if (config.apiUrl.includes('-staging')) {
  environment = 'STAGING'
}
else if (config.apiUrl.includes('-test')) {
  environment = 'TEST'
}
else if (config.apiUrl === 'https://api.kobiton.com') {
  environment = 'PRODUCTION'
}
else {
  environment = 'LOCAL'
}
config.environment = environment

export default config
