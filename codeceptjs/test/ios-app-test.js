Feature('iOS app test').config({
  protocol: 'https',
  host: 'api.kobiton.com',
  port: 443,
  user: process.env.KOBITON_USERNAME,
  key: process.env.KOBITON_API_KEY
});

Scenario('ios test on UIKitCatalog app', (I) => {
  I.seeElement({xpath: '//UIAStaticText'});
  I.wait(2);
});
