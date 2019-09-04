Feature('Android web test').config({
  protocol: 'https',
  host: 'api.kobiton.com',
  port: 443,
  user: process.env.KOBITON_USERNAME,
  key: process.env.KOBITON_API_KEY
});

Scenario('should return the title that contains Kobiton', (I) => {
  I.amOnPage('https://google.com');
  I.fillField({name: 'q'}, 'Kobiton');
  I.wait(2);
  I.sendDeviceKeyEvent(66);
  I.wait(2);
  I.seeInTitle('Kobiton');
});
