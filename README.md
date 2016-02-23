#### Init
Access [Kobition](https://kobiton.com) to get *username* and *api key*
Open `src/config.js`
 * Replace *username* and *api key*
 * Modify`desiredCaps` to match with your available devices

#### Tests
Run test
```bash
npm test
NODE_ENV=production npm test
```

Run tests with different caps sequentially:

```bash
npm run test-sequence
```

Run tests with different caps concurrently:

```bash
npm run test-parallel
```
