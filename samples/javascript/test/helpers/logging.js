exports.log = function(driver) {
  driver.on('status', function(info) {
    console.log(info.cyan);
  });
  driver.on('command', function(meth, path, data) {
    console.log(' > ' + meth.yellow, path.grey, data || '');
  });
  driver.on('http', function(meth, path, data) {
    console.log(' > ' + meth.magenta, path, (data || '').grey);
  });
};
