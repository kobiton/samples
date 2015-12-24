Guide from #https://getcomposer.org/doc/00-intro.md
1.  A quick copy-paste version including sudo:
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
2.Then install the dependencies and run your tests:
composer install
vendor/phpunit/phpunit/phpunit <GoogleTests.php>
