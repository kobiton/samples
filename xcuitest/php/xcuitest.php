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
        'sessionDescription'  => 'This is an example for XCUITest testing',
        'deviceName'          => '*',
        'flatformVersion'     => '*',
        'deviceGroup'         => 'KOBITON',
        'app'                 => 'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSample-cf0cae10-1f0e-11eb-bc6c-e3417e3453b3.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586603&Signature=OrqPAP8KJWapIuStzXmHwS28fNo%3D',
        'testRunner'          => 'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSampleUITestRunner-e3ef3500-1f0e-11eb-b45a-478d7efceb5e.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586641&Signature=DDhYizx%2FdKMZyMe%2F5QEXx5gLoGs%3D',
        'testFramework'       => 'XCUITEST',
        'sessionTimeout'      => 30,
        'tests'               => array(),
        'testPlan'            => 'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-plan/users/6/sample-fe1f27f0-1f0e-11eb-964e-0f0d0f83dd07.xctestplan?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586682&Signature=WESzuwFm55OqM4R4%2B8Zq0rD6TnA%3D'
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
