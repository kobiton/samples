import {debug} from '@kobiton/core-util'
import {parse} from './args'
import {removeSlash} from '../util'
import Url from 'url'

const args = parse()

const envVariablesToCheck = ['KOBITON_USERNAME_1',
  'KOBITON_PASSWORD_1',
  'KOBITON_API_URL',
  'KOBITON_PORTAL_URL',
  'KOBITON_EMAIL_RETAINING_TOKEN',
  'KOBITON_REPORT_SERVER_URL',
  'KOBITON_REPORT_SECRET_KEY',
  'KOBITON_LOGS_SERVER_URL'
]
for (const envName of envVariablesToCheck) {
  if (!process.env[envName]) {
    debug.log(`WARNING: environemnt ${envName} is not defined. `)
  }
}

const apiUrl = removeSlash(process.env.KOBITON_API_URL)
const defaultAutoTestHostName = Url.parse(apiUrl).hostname
const defaultAutoTestPort = ((Url.parse(apiUrl).port === 443) ? 80 : Url.parse(apiUrl).port) || 80

const config = {
  portalUrl: removeSlash(process.env.KOBITON_PORTAL_URL),
  apiUrl,
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL,
  autoTestHostname: process.env.KOBITON_AUTO_TEST_HOST || defaultAutoTestHostName,
  autoTestPort: defaultAutoTestPort,
  username1: process.env.KOBITON_USERNAME_1,
  password1: process.env.KOBITON_PASSWORD_1,
  username2: process.env.KOBITON_USERNAME_2,
  password2: process.env.KOBITON_PASSWORD_2,
  emailRetainingToken: process.env.KOBITON_EMAIL_RETAINING_TOKEN,
  longTestSuiteIterationAmount: args.longTestSuiteIterationAmount,
  expectedDurationInMinutes: args.mobileTestDuration,
  device: {
    name: args.deviceName,
    platform: args.devicePlatform,
    orientation: args.deviceOrientation,
    group: args.deviceGroup,
    number: args.deviceNumbers,
    captureScreenshots: args.captureScreenshots,
    indexBegin: args.indexBegin,
    indexFinish: args.indexFinish,
    arrayUDID: args.arrayUDID
  },
  manual: {
    screenQuality: args.screenQuality,
    maxBrowserInstances: args.maxBrowserInstances
  },
  report: {
    reporter: args.reporter,
    name: args.reportName,
    serverUrl: process.env.KOBITON_REPORT_SERVER_URL,
    serverSecretKey: process.env.KOBITON_REPORT_SECRET_KEY
  },
  log: {
    serverUrl: process.env.KOBITON_LOGS_SERVER_URL,
    pushLog: args.logs
  },
  healthCheck: {
    onDeviceBusyRetryInterval: args.onDeviceBusyRetryInterval * 1000,
    maxRetry: args.onBusyDeviceRetryTimes
  }
}

const parsedUrl = Url.parse(apiUrl)
config.autoTestHostname = parsedUrl.hostname
config.autoTestPort = (parsedUrl.protocol === 'https' ? 80 : parsedUrl.port) || 80

let environment = 'PRODUCTION'
if (config.autoTestHostname.includes('-staging')) {
  environment = 'STAGING'
}
else if (config.autoTestHostname.includes('-test')) {
  environment = 'TEST'
}
config.environment = environment

export default config
