#!/bin/bash
# Install ack
# curl https://beyondgrep.com/ack-2.22-single-file > /usr/local/bin/ack && chmod 0755 /usr/local/bin/ack
KUSERNAME=$1
KAPIKEY=$2
APPNAME=$3
APPPATH=$4
APPID=$5

echo 'Step 1: Generate Basic Authorization'

BASICAUTH="$(echo -n $KUSERNAME:$KAPIKEY | base64)"
header="Authorization: Basic $BASICAUTH"

echo 'Step 2: Generate Upload URL'
if [ -z "$APPID" ]; then
  JSON="{\"filename\":\"${APPPATH}\"}"
else
  JSON="{\"filename\":\"${APPPATH}\",\"appId\":$APPID}"
fi

curl -X POST https://api.kobiton.com/v1/apps/uploadUrl \
  -H "$header" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d "$JSON" \
  -o ".tmp.response.json"

UPLOADURL=`cat ".tmp.response.json" | ack -o --match '(?<=url\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
KAPPPATH=`cat ".tmp.response.json" | ack -o --match '(?<=appPath\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`

echo
echo 'Step 3: Upload File To S3'

curl -T "${APPPATH}" \
-H 'content-type: application/octet-stream' \
-H 'x-amz-tagging: unsaved=true' \
-X PUT "${UPLOADURL}"

echo 'Step 4: Create Application Or Version'

JSON="{\"filename\":\"${APPNAME}\",\"appPath\":\"${KAPPPATH}\"}"

echo
curl -X POST https://api.kobiton.com/v1/apps \
  -H "$header" \
  -H 'content-type: application/json' \
  -d "$JSON"

echo '...Done'
