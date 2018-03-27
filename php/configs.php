<?php

$auth = 'username:apiKey@api.kobiton.com'; // for auto app
$kobiton_server_url = 'username:apiKey@api.kobiton.com/wd/hub'; // for auto web

$desired_caps_android_web = array(
  'sessionName'         => 'Android web',
  'sessionDescription'  => 'This is an example for Android web testing',
  'browserName'         => 'chrome',
  'platformName'        => 'Android',
  'deviceName'          => 'Galaxy S5',
  'deviceOrientation'   => 'portrait',
  'deviceGroup'         => 'KOBITON',
  'captureScreenshots'  => true
);

$desired_caps_ios_web = array(
  'sessionName'         => 'iOS web',
  'sessionDescription'  => 'This is an example for iOS web testing',
  'browserName'         => 'safari',
  'platformName'        => 'iOS',
  'deviceName'          => 'iPhone 7',
  'deviceOrientation'   => 'portrait',
  'deviceGroup'         => 'KOBITON',
  'captureScreenshots'  => true
);

$desired_caps_android_app = array(
 array(
   'host'         => $auth,
   'port'         => 80,
   'browserName'  => '', // Handle issue "Undefined index: browser" https://github.com/giorgiosironi/phpunit-selenium/blob/master/PHPUnit/Extensions/SeleniumBrowserSuite.php#L78
   'desiredCapabilities' => array(
    'sessionName'         => 'Android app',
    'sessionDescription'  => 'This is an example for Android app testing', 
    'deviceOrientation'   => 'portrait', 
    'app'                 => 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk', 
    'captureScreenshots'  => true, 
    'deviceGroup'         => 'KOBITON', 
    'platformName'        => 'Android',
    'deviceName'          => 'Galaxy S5'
  ),
   'seleniumServerRequestsTimeout' => 120
 )
);

$desired_caps_ios_app = array(
  array(
     'host'         => $auth,
     'port'         => 80,
     'browserName'  => '', // Handle issue "Undefined index: browser" https://github.com/giorgiosironi/phpunit-selenium/blob/master/PHPUnit/Extensions/SeleniumBrowserSuite.php#L78
     'desiredCapabilities' => array(
      'sessionName'         => 'iOS app',
      'sessionDescription'  => 'This is an example for iOS app testing', 
      'deviceOrientation'   => 'portrait',
      'app'                 => 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa', 
      'captureScreenshots'  => true, 
      'deviceGroup'         => 'KOBITON', 
      'deviceName'          => 'iPhone 7',
      'platformName'        => 'iOS'
    ),
     'seleniumServerRequestsTimeout' => 120
   )
);

define('desired_caps_android_app', $desired_caps_android_app);
define('desired_caps_ios_app', $desired_caps_ios_app);