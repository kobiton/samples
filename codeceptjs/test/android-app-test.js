Feature('Android app test').config({
  protocol: 'https',
  host: 'api.kobiton.com',
  port: 443,
  user: process.env.KOBITON_USERNAME,
  key: process.env.KOBITON_API_KEY
});

Scenario('Android test on apis demo app', (I) => {
  I.seeElement({xpath: "//android.widget.TextView[@content-desc='Accessibility']"});
  I.wait(2);
  I.tap('Accessibility');
  I.wait(2);
  I.tap('Custom View');
});
