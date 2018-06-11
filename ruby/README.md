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

#### Environment Setup

1. Global Dependencies
    * Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
    * Or Install Ruby with [Homebrew](http://brew.sh/)
    ```bash
    $ brew install ruby
    ```
    * Or Install Ruby with CURL
    ```bash
    curl -L https://get.rvm.io | bash -s stable --ruby
    ```
    * Install bundler (Sudo may be necessary)
    ```bash
        gem install bundler
    ```

2. Project Dependencies
    * Install packages (Use sudo if necessary)
    ```
    $ bundle install
    ```

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
