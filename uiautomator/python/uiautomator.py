import requests
import json

url = "https://username:apiKey@api.kobiton.com/hub/session"

temp = {
    "configuration": {
        "sessionName": "Automation test session",
        "sessionDescription": "",
        "noReset": True,
        "fullReset": False,
        "deviceName": "*",
        "deviceGroup": "KOBITON",
        "testRunner": "",
        "app": "",
        "sessionTimeout": 60,
        "testTimeout": 3,
        "retryTimes": 2,
        "testPackage": "",
        "runnerClass": "",
        "tests": []
    }
}

configuration = json.dumps(temp)
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data = configuration)

print(response.text.encode('utf8'))
