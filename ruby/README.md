### Ruby sample

#### Init
* Access [Kobition](https://portal.kobiton.com) with username and password above to get *username* and *api key*
* Open files to see scanario
  - `androidWebTest.rb`
  - `androidAppTest.rb`
  - `iOSWebTest.rb`
  - `iOSAppTest.rb`
* Replace *username* and *api key* in configs.rb
* Modify`desired_caps` to match with your available devices

#### Prerequisites
* Install Ruby:  `\curl -L https://get.rvm.io | bash -s stable --ruby`
* Install Bundler:  `gem install bundler`
* Install Gems:  `bundle install`
* Update Gems: `bundle update`

#### Point to specific gem version
* Edit gemfile: example `gem 'appium_lib', '~><version>'`
* Update Gems: `bundle update`

#### Run tests
```bash
ruby test/androidWebTest.rb
ruby test/androidAppTest.rb
ruby test/iOSWebTest.rb
ruby test/iOSAppTest.rb
```

