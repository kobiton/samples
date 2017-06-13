from urllib.parse import urlparse
import sys
sys.path.append('../..')

from python import configs
from python.services.KeyService import KeyService

def kobitonServerUrl():
  service = KeyService()
  key = service.getApiKey()
  apiUrl = urlparse(configs.apiUrl)

  port = 80
  if not (apiUrl.port is None):
    port = apiUrl.port

  return "{}://{}:{}@{}/wd/hub".format(
    apiUrl.scheme,
    key['username'],
    key['key'],
    apiUrl.hostname
  )

def desiredCapabilitiesAndroidWeb(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = 'Android Web'
  caps['sessionDescription'] = 'This is an example for Android Web testing'
  caps['browserName'] = 'chrome'
  return caps

def desiredCapabilitiesAndroidApp(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = 'Android app'
  caps['sessionDescription'] = 'This is an example for Android app testing'
  caps['app'] = 'https://s3.amazonaws.com/kobiton-dev/apps-test/demo/com.dozuki.ifixit.apk'
  return caps

def desiredCapabilitiesiOSWeb(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = 'iOS Web'
  caps['sessionDescription'] = 'This is an example for iOS Web testing'
  caps['browserName'] = 'safari'
  return caps

def desiredCapabilitiesiOSApp(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = 'iOS app'
  caps['sessionDescription'] = 'This is an example for iOS app testing'
  caps['app'] = 'https://s3.amazonaws.com/kobiton-dev/apps-test/demo/iFixit.ipa'
  return caps

def createCapabilitiesFor(device):
  return {
    'deviceOrientation':  'portrait',
    'captureScreenshots': True,
    'deviceGroup':        'ORGANIZATION',
    'deviceName': device['deviceName'],
    'platformName': device['platformName'],
    'platformVersion': device['platformVersion']
  }
