import requests
import sys
sys.path.append('../..')
from python import configs

class KeyService:
  def getApiKey(self):
    hostUrl = configs.testServerUrl
    headers = {'token': configs.testServerSecretKey}
    rq = requests.get(hostUrl + '/api-keys', headers = headers)

    if rq.status_code == 200:
      key = rq.json()[0]
    else:
      key = None

    return key
