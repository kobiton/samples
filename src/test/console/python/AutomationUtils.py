try:
    from urllib.parse import urlparse
except ImportError:
     from urlparse import urlparse
import requests
import urllib3
urllib3.disable_warnings()
import sys
sys.path.append('..')
import configs

def getApiKey():
    hostUrl = configs.testServerUrl
    headers = {'token': configs.testServerSecretKey}

    rq = requests.get(hostUrl + '/api-keys', headers = headers)

    if rq.status_code == 200:
      key = rq.json()[0]
    else:
      key = None
    return key

def getOnlineDevice(platformName):
    hostUrl = configs.testServerUrl
    headers = {'token': configs.testServerSecretKey}
    url = '{}/devices/bookable/{}/1'.format(hostUrl, platformName)
    rq = requests.get(url, headers = headers)

    if rq.status_code == 200:
      device = rq.json()[0]
    else:
      device = None
    return device

def kobitonServerUrl():
  key = getApiKey()
  return "https://{}:{}@api.kobiton.com/wd/hub".format(
    key['username'],
    key['key']
  )

def desiredCapabilitiesAndroidWeb(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = '[Python] Android Web'
  caps['sessionDescription'] = 'This is an example for Android Web testing'
  caps['browserName'] = 'chrome'
  return caps

def desiredCapabilitiesAndroidApp(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = '[Python] Android app'
  caps['sessionDescription'] = 'This is an example for Android app testing'
  caps['app'] = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk'
  return caps

def desiredCapabilitiesiOSWeb(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = '[Python] iOS Web'
  caps['sessionDescription'] = 'This is an example for iOS Web testing'
  caps['browserName'] = 'safari'
  return caps

def desiredCapabilitiesiOSApp(device):
  caps = createCapabilitiesFor(device)
  caps['sessionName'] = '[Python] iOS app'
  caps['sessionDescription'] = 'This is an example for iOS app testing'
  caps['app'] = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa'
  return caps

def createCapabilitiesFor(device):
  return {
    'deviceOrientation':  'portrait',
    'captureScreenshots': True,
    'deviceGroup':        'KOBITON',
    'deviceName': device['deviceName'],
    'platformName': device['platformName'],
    'platformVersion': device['platformVersion']
  }
