#!/bin/bash
# Install ack
# curl https://beyondgrep.com/ack-2.22-single-file > /usr/local/bin/ack && chmod 0755 /usr/local/bin/ack
USERNAME=$1
APIKEY=$2
FILENAME=$3
YOUR_APPLICATION_PATH=$4

echo 'Step 1: Generate Basic Authorization'
credentials="$(echo -n "$USERNAME:$APIKEY" | base64)"
header="'Authorization: Basic $credentials'"

echo 'Step 2: Generate Upload URL'
JSON="{\"filename\" : \"${FILENAME}\"}"

curl -X POST \
  'https://api.kobiton.com/v1/apps/uploadUrl' \
  -H "Authorization: Basic ${credentials}" \
  -H 'Content-Type: application/json' \
  -d "{\"filename\" : \"${FILENAME}\"}" \
  -o ".tmp.response.json"
UPLOADURL=`cat ".tmp.response.json" | ack -o --match '(?<=url\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
APPPATH=`cat ".tmp.response.json" | ack -o --match '(?<=appPath\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`

echo 'Step 3: Upload File To S3'
curl -X PUT \
  $UPLOADURL \
  -H 'content-type: application/octet-stream' \
  -H 'x-amz-tagging: unsaved=true' \
  -T $YOUR_APPLICATION_PATH

echo 'Step 4: Create Application Or Version'
curl -X POST \
'https://api.kobiton.com/v1/apps' \
-H "Authorization: Basic ${credentials}" \
-H 'content-type: application/json' \
-d "{\"filename\":\"${FILENAME}\",\"appPath\":\"${APPPATH}\"}"

echo '...Done'
