import childProcess from 'child_process'

export async function executeRubyTest() {
  const executorDir = 'build/test/console/ruby/multi-version-executor/'
  const spawn = childProcess.spawn
  const ls = spawn(`cd ${executorDir} && ruby ExecuteTests.rb`, [], {shell: true})

  ls.stdout.pipe(process.stdin)
  ls.stderr.pipe(process.stderr)
}