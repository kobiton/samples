const debug = require('@kobiton/core-util').debug
const spawn = require('child_process').spawn

debug.enable('test')

process.argv.forEach(function (val, index, array) {
  const ls = spawn('npm', ['run', val])

  ls.stdout.on('data', (data) => {
    debug.log('test', `stdout ${val}: ${data}`)
  });

  ls.stderr.on('data', (data) => {
    debug.log('test', `stderr ${val}: ${data}`)
  });

  ls.on('close', (code) => {
    debug.log('test', `child process ${val} exited with code ${code}`)
  });
});
