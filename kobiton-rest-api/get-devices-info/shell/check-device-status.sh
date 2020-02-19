#!/bin/bash
export KOBITON_USERNAME=$1
export KOBITON_API_KEY=$2

if [ -z "$KOBITON_USERNAME" ] || [ -z "$KOBITON_APIKEY" ]; then
    echo "KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script"
    exit 1 
fi

RESPONSE=$(curl -u $KOBITON_USERNAME:$KOBITON_API_KEY -s -X GET "https://api.kobiton.com/v1/devices?isOnline=true" \
  -H 'Accept: application/json')

echo $RESPONSE | python -mjson.tool
