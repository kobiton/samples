### Ruby sample

#### Init
* Check config/config.rb to check configuration

#### Prerequisites
* Install Ruby via RVM `curl -sSL https://get.rvm.io | bash -s stable --ruby`
* Install Bundler:  `gem install bundle`
* Install Gems:  `bundle update`

#### Run Appium tests
cd into Tests/Appium
```bash
  ruby AndroidWebTest.rb
  ruby IOSWebTest.rb
  ruby AndroidAppTest.rb
  ruby IOSAppTest.rb
```

#### Run Selenium tests
cd into Tests/Selenium
```bash
  ruby AndroidWebTest.rb
  ruby IOSWebTest.rb
```
