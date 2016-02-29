#### Init
Access [Kobition](https://kobiton.com) to get *username* and *api key*

Open `src/helpers/servers.js`
* Replace *username* and *api key*

Open `src/helpers/caps.js`
* Modify`desiredCaps` to match with your available devices

#### Tests
Run test
```bash
npm test-all
```

Run tests with the same caps and different caps sequentially:

```bash
npm run test-sequences
```

Run tests with different caps concurrently:

```bash
npm run test-parallel
```

Run tests to verify capabilities:

```bash
npm run test-capabilities
```
