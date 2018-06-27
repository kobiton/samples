import {iOSNativeAppScript} from '../../framework/appium/app/ios-native-app-script'

export default class IOSAppTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    await iOSNativeAppScript(timeStamp, [targetDevice], expectedDuration)
  }
}
