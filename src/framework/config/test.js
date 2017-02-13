import {removeSlash} from '../util'
import {parse} from './args'
import {debug} from '@kobiton/core-util'
import Url from 'url'

const args = parse()

const apiUrl = removeSlash(process.env.KOBITON_API_URL || 'https://api-test.kobiton.com')
const defaultAutoTestHostName = Url.parse(apiUrl).hostname
const defaultAutoTestPort = ((Url.parse(apiUrl).port === 443) ? 80 : Url.parse(apiUrl).port) || 80
debug.log('apiUrl', apiUrl)
const config = {
  portalUrl: removeSlash(process.env.KOBITON_PORTAL_URL || 'https://portal-test.kobiton.com'),
  apiUrl,
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL || 'https://s3.amazonaws.com/kobiton/nightly/kobiton-osx-test.dmg',
  autoTestHostname: process.env.KOBITON_AUTO_TEST_HOST || defaultAutoTestHostName,
  autoTestPort: defaultAutoTestPort,
  username1: process.env.KOBITON_USERNAME_1 || 'api_test4',
  password1: process.env.KOBITON_PASSWORD_1 || 'mario8x@123',
  username2: process.env.KOBITON_USERNAME_2 || 'tester',
  password2: process.env.KOBITON_PASSWORD_2 || '123456',
  emailRetainingToken: 'xRT8KJ',

  longTestSuiteIterationAmount: args.longTestSuiteIterationAmount,
  expectedDurationInMinutes: args.mobileTestDuration,
  device: {
    name: args.deviceName,
    platform: args.devicePlatform,
    udid: args.deviceUDID,
    orientation: args.deviceOrientation,
    group: args.deviceGroup,
    number: args.deviceNumbers
  },
  manual: {
    screenQuality: args.screenQuality,
    maxBrowserInstances: args.maxBrowserInstances
  }
}

const parsedUrl = Url.parse(apiUrl)
config.autoTestHostname = parsedUrl.hostname
config.autoTestPort = (parsedUrl.protocol === 'https' ? 80 : parsedUrl.port) || 80

export default config
