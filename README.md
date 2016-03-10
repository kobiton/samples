#### Init
Access [Kobition](https://kobiton.com) to get *username* and *password*

Open `src/helpers/servers.js`
* Replace *username* and *password* into account_test

#### Tests
Run all test
```bash
gulp
```

Run tests with the same caps and different caps sequentially:

```bash
gulp test-sequence-one-device
```

Run tests with different caps concurrently:

```bash
gulp test-all-devices
```

Run tests to verify capabilities:

```bash
gulp test-capabilities
```
