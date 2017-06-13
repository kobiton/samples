<?php

function getAPIKey() {
  include("configs.php");

  $url = $testServerUrl . "/api-keys";
  $ch = curl_init($url);

  $headers = array(
    "token: ".$testServerSecretKey
  );
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $body = curl_exec($ch);

  curl_close($ch);
  $allKeys = json_decode($body);

  $key = $allKeys[0];
  return $key;
}
