const spawn = require('child_process').spawn;

process.argv.forEach(function (val, index, array) {
  const ls = spawn('npm', ['run', val]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout ${val}: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr ${val}: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process ${val} exited with code ${code}`);
  });
});
