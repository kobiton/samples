<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://username:apiKey@api.kobiton.com/hub/session",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  $configuration  = array(
    'configuration' => array(
        'sessionName'         => 'Android app',
        'sessionDescription'  => 'This is an example for Android app testing',
        'app'                 => '', 
        'testRunner'          => '',
        'continueOnFailure'   => true, 
        'deviceGroup'         => 'KOBITON', 
        'platformName'        => 'Android',
        'platformVersion'     => '*',
        'deviceName'          => '*',
        'testPackage'         => '',
        'tests'        => []
    )),
  CURLOPT_POSTFIELDS => json_encode($configuration),
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
