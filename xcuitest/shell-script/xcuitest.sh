#!/bin/bash
# Install ack
# curl https://beyondgrep.com/ack-2.22-single-file > /usr/local/bin/ack && chmod 0755 /usr/local/bin/ack

KUSERNAME=$1
KAPIKEY=$2
TESTRUNNERNAME=$3
TESTRUNNERPATH=$4
APPNAME=$5
APPPATH=$6
APPID=$7

BASICAUTH="$(echo -n $KUSERNAME:$KAPIKEY | base64)"
header="Authorization: Basic $BASICAUTH"

upload_test_runner() {
    echo 'Upload Test Runner To S3'

    echo 'Step 1: Generate Upload URL'

    JSON="{\"runnerName\":\"${TESTRUNNERNAME}\"}"
  	curl -v -H "Content-Type: application/json" -d "$JSON" -H "$header" \
      https://api.kobiton.com/v1/testRunner/uploadUrl  -o uploadTestRunnerUrlResponse.json

    uploadUrl=`cat "uploadTestRunnerUrlResponse.json" | ack -o --match '(?<=uploadUrl\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
    runnerPath=`cat "uploadTestRunnerUrlResponse.json" | ack -o --match '(?<=runnerPath\":")([^"]*)'`

    echo 'Step 2: Upload File To S3'

    curl -T "${TESTRUNNERPATH}" \
        -H 'content-type: application/octet-stream' \
        -H 'x-amz-tagging: unsaved=true' \
        -X PUT "${uploadUrl}"

    printf "{\"runnerPath\": \"${runnerPath}\"}" > inputTestRunnerPath.json

    echo 'Step 3: Get downloadUrl'

    curl -v -H "Content-Type: application/json" --data @inputTestRunnerPath.json \
         -H "$header" https://api.kobiton.com/v1/testRunner/downloadUrl -o downloadUrlResponse.json

    downloadUrl=`cat downloadUrlResponse.json | ack -o --match '(?<=downloadUrl\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
    echo "--------> downloadUrl ${downloadUrl}"

    echo '...Done'
}

upload_app() {
    echo 'Upload App To S3'
    echo 'Step 1: Generate Upload URL'
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
        -o "uploadAppUrlResponse.json"

    UPLOADURL=`cat "uploadAppUrlResponse.json" | ack -o --match '(?<=url\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
    KAPPPATH=`cat "uploadAppUrlResponse.json" | ack -o --match '(?<=appPath\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`

    echo
    echo 'Step 2: Upload File To S3'

    curl -T "${APPPATH}" \
        -H 'content-type: application/octet-stream' \
        -H 'x-amz-tagging: unsaved=true' \
        -X PUT "${UPLOADURL}"

    echo 'Step 3: Create Application Or Version'

    JSON="{\"filename\":\"${APPNAME}\",\"appPath\":\"${KAPPPATH}\"}"

    echo
    curl -X POST https://api.kobiton.com/v1/apps \
        -H "$header" \
        -H 'content-type: application/json' \
        -d "$JSON" \
        -o appIdOrVersionResponse.json

    echo '...Done'
}

execute_test() {
    echo 'Execute Test'

    downloadUrl=`cat downloadUrlResponse.json | ack -o --match '(?<=downloadUrl\":")([_\%\&=\?\.aA-zZ0-9:/-]*)'`
    appVersion=`cat appIdOrVersionResponse.json | ack -o --match '(?<=versionId\":)([0-9]*)'`

    JSON="{
        \"configuration\" : {
            \"sessionName\": \"This is a xcui session\",
            \"sessionDescription\": \"This is an example for XCuiTest testing\",
            \"deviceName\": \"iPhone 13 Pro Max\",
            \"udid\": \"00008110-000E65200CD2801E\",
            \"app\": \"kobiton-store:v${appVersion}\",
            \"continueOnFailure\": true,
            \"sessionTimeout\": 30,
            \"testFramework\": \"XCUITEST\",
            \"tests\": [],
            \"testRunner\": \"${downloadUrl}\"
        }
    }"

    # write configuration to configuration.json
    printf '%s\n' "${JSON}" > configuration.json
    
    curl -H "$header" -X POST "https://api.kobiton.com/hub/session" \
        -H "Accept: application/json" -H "Content-Type: application/json" \
        --data @configuration.json -o sessionExecution.json

    echo '...Done. Please view sessionExecution.json for result'
}

upload_test_runner
upload_app
execute_test


