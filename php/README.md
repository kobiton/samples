### PHP sample

#### Init
* Access [Kobition](https://portal.kobiton.com) to get *username* and *api key*
* Open files
  - `AndroidWebTest.php`
  - `AndroidAppTest.php`
  - `iOSWebTest.php`
  - `iOSAppTest.php`
* Replace *username* and *api key*
* Modify`desiredCaps` to match with your available devices

#### Prerequisites
 * Install [php](http://php.net/)
 * Install [composer](https://getcomposer.org/download/) to manage dependencies in PHP
 * Run command `composer install` (Make sure you delete composer.lock file & vendor folder before running this command)

### To install custom packages, please follow the instruction below:

```
php composer.phar require "appium/php-client=0.3.0"
php composer.phar require "phpunit/phpunit=5.7.27"
php composer.phar require "phpunit/phpunit-selenium=3.0.3"
php composer.phar require "facebook/webdriver=1.6.0"
```

#### Run tests
```bash
vendor/phpunit/phpunit/phpunit AndroidWebTest.php
vendor/phpunit/phpunit/phpunit AndroidAppTest.php
vendor/phpunit/phpunit/phpunit iOSWebTest.php
vendor/phpunit/phpunit/phpunit iOSAppTest.php
```
