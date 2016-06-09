### Prerequisites
 * Install local packages:  `npm install`

### Init
Access [Kobition](https://kobiton.com) to get *username* and *password*

Open `src/helpers/portal-api.js`
* Replace *username* and *password* into account_test

### Tests - Regression

#### 1. Run all tests on test environment
```bash
npm run gulp test:test
```

#### 2. Run all tests on staging environment
```bash
npm run gulp test:staging
```

#### 3. Run all tests on production environment
```bash
npm run gulp test:production
```

### Tests - Development

#### 1. Run subset of tests on test environment
```bash
npm run gulp test:test -- --android
npm run gulp test:test -- --ios
```

#### 2. Run subset of tests on staging environment
```bash
npm run gulp test:staging --  --android
npm run gulp test:staging --  --ios
```

#### 3. Run subset of tests on production environment
```bash
npm run gulp test:production --  --android
npm run gulp test:production --  --ios
```

#### 4. Run test with a specific scenario on test/ staging/ production environment
Examples:
```bash
npm run gulp test-multiple-devices — —ios
npm run gulp test-multiple-devices — —android
NODE_ENV=staging npm run gulp test-multiple-devices — —ios
NODE_ENV=staging npm run gulp test-multiple-devices — —android
NODE_ENV=production npm run gulp test-multiple-devices — —ios
NODE_ENV=production npm run gulp test-multiple-devices — —android
```

### Reports

#### 1. Default port is 3000
```bash
$ npm run gulp report-viewer

See reports at http://localhost:3000/
```
#### 2. Use custom port
```bash
$ KOBITON_PORT=8080 npm run gulp report-viewer

See reports at http://localhost:8080/
```

### Portal Test

* Start test on three browsers (Firefox, Chrome and PhantomJS)
* Run test with a specific scenario on test/ staging/ production environment
```bash
$ npm run test-portal
$ NODE_ENV=staging npm run test-portal
$ NODE_ENV=production npm run test-portal
```
