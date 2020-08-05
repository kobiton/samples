<?php
$curl = curl_init();

$username = '';
$apiKey = '';

$encodeAuth = 'Basic ' .base64_encode($username. ':' .$apiKey);

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.kobiton.com/hub/session',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  $configuration  = array(
    'configuration' => array(
        'sessionName'         => 'Automation test session',
        'sessionDescription'  => 'This is an example for UIAutomator testing',
        'noReset'             => true,
        'fullReset'           => false,
        'deviceName'          => '*',
        'platformVersion'     => '*',
        'deviceGroup'         => 'KOBITON',
        'app'                 => 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/uiautomator-app.apk',
        'testRunner'          => 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/uiautomator-test-runner.apk',
        'continueOnFailure'   => true,
        'sessionTimeout'      => 30,
        'testTimeout'         => 10,
        'retryTimes'          => 3,
        'tests'               => array(
          'com.example.android.testing.uiautomator.BasicSample.test',
          'ChangeTextBehaviorTest',
          'ChangeTextBehaviorTest#testChangeText_sameActivity'
        )
    )),
  CURLOPT_POSTFIELDS => json_encode($configuration),
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: ' .$encodeAuth,
    'Accept: application/json'
  ),
));

$response = curl_exec($curl);
echo $response;

curl_close($curl);
