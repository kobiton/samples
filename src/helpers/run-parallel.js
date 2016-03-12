import {debug} from '@kobiton/core-util'
import {spawn} from 'child_process'

debug.enable('test')

process.argv.forEach(function (value, index, array) {
  const ls = spawn('npm', ['run', value])
  ls.stdout.on('data', (data) => {
    debug.log('test', `stdout ${value}: ${data}`)
  });

  ls.stderr.on('data', (data) => {
    debug.log('test', `stderr ${value}: ${data}`)
  });

  ls.on('close', (code) => {
    debug.log('test', `child process ${value} exited with code ${code}`)
  });
});
