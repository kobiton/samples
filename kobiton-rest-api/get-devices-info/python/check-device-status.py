import os
import requests
import sys
headers = {
  'Accept': 'application/json'
}

username = os.getenv('KOBITON_USERNAME')
apiKey = os.getenv('KOBITON_APIKEY')
deviceId = os.getenv('KOBITON_DEVICE_ID') or 684737

if username==None or apiKey==None:
    print("KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script")
    sys.exit()
   
r = requests.get('https://api.kobiton.com/v1/devices/' + str(deviceId) + '/status', auth=(username, apiKey),
headers = headers)

if r.status_code!=200:
    print(r.status_code)
    print(r.text)
    sys.exit()

deviceStatus = r.json()

if deviceStatus['isOnline']==True and deviceStatus['isBooked']==False:
    print("The device is ready to use")
elif deviceStatus['isOnline']==True and deviceStatus['isBooked']==True:
    print("The device is busy")
else:
    print("The device is offline")
