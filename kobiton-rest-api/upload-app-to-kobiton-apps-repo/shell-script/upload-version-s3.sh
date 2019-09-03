#!/bin/bash
# Install ack
# curl https://beyondgrep.com/ack-2.22-single-file > /usr/local/bin/ack && chmod 0755 /usr/local/bin/ack
user_name=$1
apikey=$2
file_name=$3
app_path=$4
app_id=$5

echo 'Step 1: Generate Basic Authorization'
credentials="$(echo -n "$user_name:$apikey" | base64)"
header="'Authorization: Basic $credentials'"

echo 'Step 2: Generate Upload URL'

curl -X POST \
  'https://api-test.kobiton.com/v1/apps/uploadUrl' \
  -H "Authorization: Basic ${credentials}" \
  -H 'Content-Type: application/json' \
  -d "{\"filename\": \"${file_name}\", \"appId\": \"${app_id}\"}" \
  -o ".tmp.response.json"
UPLOADURL=`cat ".tmp.response.json" | ack -o --match '(?<=url\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
APPPATH=`cat ".tmp.response.json" | ack -o --match '(?<=appPath\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`

echo 'Step 3: Upload File To S3'
curl -X PUT \
  $UPLOADURL \
  -H 'content-type: application/octet-stream' \
  -H 'x-amz-tagging: unsaved=true' \
  -T $app_path

echo 'Step 4: Create Application Or Version'

curl -X POST \
'https://api-test.kobiton.com/v1/apps' \
-H "Authorization: Basic ${credentials}" \
-H 'content-type: application/json' \
-d "{\"filename\":\"${file_name}\",\"appPath\":\"${APPPATH}\"}"

echo '...Done'
