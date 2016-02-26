const debug = require('@kobiton/core-util').debug
const spawn = require('child_process').spawn

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
