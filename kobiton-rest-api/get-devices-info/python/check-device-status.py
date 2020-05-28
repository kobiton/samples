import os
import requests
import sys
import json
headers = {
'Accept': 'application/json'
}

username = os.getenv('KOBITON_USERNAME')
apiKey = os.getenv('KOBITON_API_KEY')

if username==None or apiKey==None:
  print("KOBITON_USERNAME and KOBITON_API_KEY variables are need to execute the script")
  sys.exit()

r = requests.get('https://api.kobiton.com/v1/devices?isOnline=true&isBooked=false', auth=(username, apiKey),
headers = headers)

if r.status_code != 200:
  print(r.status_code)
  print(r.text)
  sys.exit()

deviceList = json.loads(r.text)
cloudDevices = deviceList["cloudDevices"]

if len(cloudDevices) == 0:
  print("There is no online device")
  sys.exit()

print("Online device list:")
for device in cloudDevices:
  item = {
    "id": device["id"],
    "udid": device["udid"],
    "isBooked": device["isBooked"],
    "modelName": device["modelName"],
    "deviceName": device["deviceName"],
    "platformName": device["platformName"],
    "platformVersion": device["platformVersion"]
  }
  print(json.dumps(item, indent=4, sort_keys=True))