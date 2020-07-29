<?php
$curl = curl_init();

$username = '';
$apiKey = '';

$encodeAuth = 'Basic ' .base64_encode($username. ':' .$apiKey);

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.kobiton.com/hub/session',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  $configuration  = array(
    'configuration' => array(
        'sessionName'         => 'Automation test session',
        'sessionDescription'  => 'This is an example for Android app testing',
        'noReset'             => true,
        'fullReset'           => false,
        'deviceName'          => '*',
        'platformVersion'     => '*',
        'deviceGroup'         => 'KOBITON',
        'app'                 => '',
        'testRunner'          => '',
        'continueOnFailure'   => true,
        'sessionTimeout'      => 2,
        'testTimeout'         => 3,
        'retryTimes'          => 2,
        'tests'        => []
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
