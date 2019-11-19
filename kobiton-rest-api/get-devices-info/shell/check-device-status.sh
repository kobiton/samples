#!/bin/bash
function jsonValue() {
  KEY=$1
  awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'$KEY'\042/){print $(i+1)}}}' | tr -d '"'
}

function checkDeviceStatus() {
  if [ -z "$KOBITON_DEVICE_ID" ]; then
    KOBITON_DEVICE_ID=684737
  fi

  RESPONSE=$(curl -u $KOBITON_USERNAME:$KOBITON_APIKEY -s -X GET "https://api.kobiton.com/v1/devices/$KOBITON_DEVICE_ID/status" \
    -H 'Accept: application/json')

  IS_ONLINE=$(echo $RESPONSE | jsonValue isOnline)
  IS_BOOKED=$(echo $RESPONSE | jsonValue isBooked)

  # Workaround for handling if response status is not 200
  if [ -z "$IS_ONLINE" ] || [ -z "$IS_BOOKED" ]; then
    echo $RESPONSE
    exit 1
  fi

  if [ "$IS_ONLINE" = true ] && [ "$IS_BOOKED" = false ]; then
      echo "The device is ready to use"
  elif [ "$IS_ONLINE" = true ] && [ "$IS_BOOKED" = true ]; then
      echo "The device is busy"
  else
      echo "The device is offline"
  fi
}

function main() {
  if [ -z "$KOBITON_USERNAME" ] || [ -z "$KOBITON_APIKEY" ]; then
    echo "KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script"
  else
    checkDeviceStatus
  fi
}

main
