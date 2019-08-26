import base64
import requests
import os
import json
from subprocess import call
user_name= os.environ.get('user_name', '')
apikey= os.environ.get('apikey', '')
app_path= os.environ.get('app_path', '')
file_name= os.environ.get('file_name', '')
# Get pre-signed link
api_key = (user_name + ':' + apikey).encode('utf-8')
print(api_key)
auth = base64.b64encode(api_key).decode('utf-8')
print(auth)
headers = {
    'Authorization': 'Basic ' + auth,
    'Accept': 'application/json'
}
data = {
    'filename' : file_name,
}
r = requests.post('https://api.kobiton.com/v1/apps/uploadUrl', json=data, headers=headers)

new_url = None
if r.status_code == 200:
    print(r.text)
    new_app = json.loads(r.text)
    new_url = new_app.get('url', None)

if new_url:
    # Upload your application to S3 with this pre-signed link
    headers = {
      'Content-Type': 'application/octet-stream',
      'x-amz-tagging': 'unsaved=true'
    }
    r = requests.put(new_url, data=open(app_path).read(), headers=headers)
    new_path = new_app.get('appPath', None)

    # Ask Kobiton to link the upload file to App Repository
    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth,
    }

    data = {
      'filename': file_name,
      'appPath': new_path
    }
    r = requests.post('https://api.kobiton.com/v1/apps', json=data, headers=headers)
    print(r.status_code)
    print(r.text)
