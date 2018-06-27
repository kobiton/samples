import {androidNativeAppScript} from '../../framework/appium/app/android-native-app-script'

export default class AndroidAppTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    await androidNativeAppScript(timeStamp, [targetDevice], expectedDuration)
  }
}
