import {removeSlash} from '../util'
import {parse} from './args'
import Url from 'url'

const args = parse()

const apiUrl = removeSlash(process.env.KOBITON_API_URL)
const defaultAutoTestHostName = Url.parse(apiUrl).hostname
const defaultAutoTestPort = ((Url.parse(apiUrl).port === 443) ? 80 : Url.parse(apiUrl).port) || 80
const dbConnection = {
  username: process.env.REPORT_DB_USERNAME,
  password: process.env.REPORT_DB_PASSWORD,
  host: process.env.REPORT_DB_HOST,
  port: process.env.REPORT_DB_PORT,
  dbName: process.env.REPORT_DB_NAME
}

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
  testDb: {
    connectionUri: `mongodb://${dbConnection.username}:${dbConnection.password}@${dbConnection.host}:${dbConnection.port}/${dbConnection.dbName}`
  },
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
    name: args.reportName
  }
}

const parsedUrl = Url.parse(apiUrl)
config.autoTestHostname = parsedUrl.hostname
config.autoTestPort = (parsedUrl.protocol === 'https' ? 80 : parsedUrl.port) || 80

export default config
