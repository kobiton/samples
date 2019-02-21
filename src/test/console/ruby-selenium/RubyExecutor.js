import * as cmd from '../CmdExecutor'

export async function execute() {
	await cmd.executeTestCmdSync('curl -sSL https://get.rvm.io | bash -s stable --ruby')
  await cmd.executeTestCmdSync('gem install bundle')
  await cmd.executeTestCmdSync('bundle update')
  const executorDir = 'build/test/console/ruby-selenium/multi-version-executor/'
  return await cmd.executeTestCmdSync(`cd ${executorDir} && ruby ExecuteTests.rb`)
}
