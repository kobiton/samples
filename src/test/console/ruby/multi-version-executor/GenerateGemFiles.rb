def generateGemFiles(gemName, numberOfVersion)
  cmd = "gem list #{gemName} --remote --all"
  response = `#{cmd}`

  # Get selected versions
  versionsInParenttheses = /\(.*?\)/.match(response)[0]
  versions = versionsInParenttheses
    .sub('(', '').sub(')', '')
    .split(', ')

  versionGroups = {}
  versions.each do |v|
    major = /.+?(?=\.)/.match(v)[0]
    if versionGroups[major] == nil
      versionGroups[major] = []
    end
    versionGroups[major].push v
  end

  groupsToGet = versionGroups.keys.first numberOfVersion

  selectedVersions = []
  groupsToGet.each do |group|
    selectedVersions.push versionGroups[group].first
  end

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
