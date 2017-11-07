<?php
include("services/KeyService.php");

function kobitonServerUrl() {
  include("configs.php");
  $key = getAPIKey();

  $apiUrlObj = parse_url($apiUrl);

  $automationUrl = sprintf("%s://%s:%s@%s/wd/hub",
    $apiUrlObj["scheme"],
    $key->username,
    $key->key,
    $apiUrlObj["host"]
  );
  print $automationUrl;

  return $automationUrl;
}

function desiredCapabilitiesAndroidWeb($device) {
  $caps = createCapabilitiesFor($device);
  $caps['sessionName'] = '[PHP] Android Web';
  $caps['sessionDescription'] = 'This is an example for Android Web testing';
  $caps['browserName'] = 'chrome';

  return $caps;
}

function desiredCapabilitiesiOSWeb($device) {
  $caps = createCapabilitiesFor($device);
  $caps['sessionName'] = '[PHP] iOS Web';
  $caps['sessionDescription'] = 'This is an example for iOS Web testing';
  $caps['browserName'] = 'safari';

  return $caps;
}

function createCapabilitiesFor($device) {
  return array(
    'deviceOrientation'   => 'portrait',
    'captureScreenshots'  => true,
    'deviceGroup'         => 'KOBITON',
    'deviceName'          => $device->deviceName,
    'platformName'        => $device->platformName,
    'platformVersion'     => $device->platformVersion,
  );
}
