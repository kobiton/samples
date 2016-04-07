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
