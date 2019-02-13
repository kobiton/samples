def generateGemFiles(gemName, numberOfVersion)
  cmd = "gem list --exact #{gemName} --remote --all"
  response = `#{cmd}`

  # Get selected versions
  versionsInParenttheses = /\(.*?\)/.match(response)[0]
  versions = versionsInParenttheses
    .sub('(', '').sub(')', '')
    .split(', ')

  selectedVersions = versions.first numberOfVersion

  # Read from gemfile template and generate gemfiles
  gemFileTemplate = File.read 'gemtemplates/Gemfile.template'
  gemFileTemplate = gemFileTemplate.sub '<bundle-name>', gemName

  def writeFile(fileName, fileContent)
    f = File.new fileName, "w"
    f.write fileContent
    f.close()
  end

  # Generate gemfile for each version
  gemFilesDir = 'gemfiles'
  Dir.mkdir gemFilesDir if !File.directory? gemFilesDir
  selectedVersions.each do |version|
    fileName = "Gemfile_#{version}"
    fileContent = gemFileTemplate.sub '<bundle-version>', version

    filePath = "#{gemFilesDir}/#{fileName}"
    puts filePath
    writeFile filePath, fileContent
  end
end
