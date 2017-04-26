require 'rubygems'
require 'rbconfig'
require 'fileutils'
require_relative './GenerateGemFiles'

THIS_FILE = File.expand_path(__FILE__)
RUBY = File.join(RbConfig::CONFIG['bindir'], RbConfig::CONFIG['ruby_install_name'])

LIB_NAME = "appium_lib"
NUMBER_OF_VERSION_TO_CHECK = 3

$stdout.sync = true

def deleteAllFiles(pattern)
  files = Dir[pattern]
  files.each do |f|
    File.delete(f) if File.exist?(f)
  end
  return files
end

def exec(command)
  return system(command)
end

def applyGemfile(path)
  fileName = File.basename(path)
  FileUtils.cp(path, '../')
  destFile = "../#{fileName}"
  File.rename(destFile, '../Gemfile')
end

def executeTests()
  testResult = true
  failedGemFiles = []
  gemFiles = Dir['./gemfiles/*']
  gemFiles.each do |file|
    if (!file.end_with? '.lock')
      puts "*********Execute test with GemFile: #{file}********"

      applyGemfile(file)

      exec "gem uninstall #{LIB_NAME} -a -I"
      exec "bundle update"
      webPassed = exec "#{RUBY} ../AndroidWebTest.rb"
      appPassed = exec "#{RUBY} ../AndroidAppTest.rb"
      passed = webPassed && appPassed

      if !passed
        failedGemFiles.push(file)
      end
      testResult = testResult && passed
    end
  end
  return testResult, failedGemFiles
end

if $PROGRAM_NAME == __FILE__
  puts '1. Remove old gemfiles'
  deletedFiles = deleteAllFiles './gemfiles/*'
  puts deletedFiles
  puts

  puts '2. Generate new gemfiles'
  generateGemFiles LIB_NAME, NUMBER_OF_VERSION_TO_CHECK

  puts "2. Execute Test"
  passed, failedGemFiles = executeTests
  puts

  if !passed
    raise "Run test failed with: #{failedGemFiles.join(', ')}"
    fail
  end
end
