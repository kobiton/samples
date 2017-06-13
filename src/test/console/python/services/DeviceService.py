import requests
import sys
sys.path.append('../..')
from python import configs

class DeviceService:
  def getOnlineDevice(self, platformName):
    hostUrl = configs.testServerUrl
    headers = {'token': configs.testServerSecretKey}
    url = '{}/devices/bookable/{}/1'.format(hostUrl, platformName)
    rq = requests.get(url, headers = headers)

    if rq.status_code == 200:
      device = rq.json()[0]
    else:
      device = None

    return device
