<?php

function getOnlineDevice($platform) {
  include("configs.php");

  $url = $testServerUrl.'/devices/bookable/'.$platform.'/1';
  $ch = curl_init($url);

  $headers = array(
    "token: ".$testServerSecretKey
  );
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $body = curl_exec($ch);

  curl_close($ch);
  $allDevices = json_decode($body);

  $device = $allDevices[0];
  return $device;
}
